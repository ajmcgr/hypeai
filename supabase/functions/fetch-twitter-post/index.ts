import { createHmac } from "node:crypto";
import { corsHeaders, handleOptions } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleOptions(req);
  if (corsResponse) return corsResponse;

  try {
    const { postUrl } = await req.json();
    console.log('Fetching Twitter/X post:', postUrl);

    // Extract tweet ID from URL
    const tweetIdMatch = postUrl.match(/status\/(\d+)/);
    if (!tweetIdMatch) {
      throw new Error('Invalid Twitter URL format. Expected format: https://twitter.com/.../status/123456789');
    }
    const tweetId = tweetIdMatch[1];

    const API_KEY = Deno.env.get("TWITTER_CLIENT_ID")?.trim();
    const API_SECRET = Deno.env.get("TWITTER_CLIENT_SECRET")?.trim();
    const ACCESS_TOKEN = Deno.env.get("TWITTER_ACCESS_TOKEN")?.trim();
    const ACCESS_TOKEN_SECRET = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET")?.trim();

    if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
      throw new Error("Twitter credentials not configured properly");
    }

    // Generate OAuth signature
    function generateOAuthSignature(
      method: string,
      url: string,
      params: Record<string, string>,
      consumerSecret: string,
      tokenSecret: string
    ): string {
      const signatureBaseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
        Object.entries(params)
          .sort()
          .map(([k, v]) => `${k}=${v}`)
          .join("&")
      )}`;
      const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
      const hmacSha1 = createHmac("sha1", signingKey);
      return hmacSha1.update(signatureBaseString).digest("base64");
    }

    function generateOAuthHeader(method: string, url: string): string {
      const oauthParams = {
        oauth_consumer_key: API_KEY!,
        oauth_nonce: Math.random().toString(36).substring(2),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_token: ACCESS_TOKEN!,
        oauth_version: "1.0",
      };

      const signature = generateOAuthSignature(method, url, oauthParams, API_SECRET!, ACCESS_TOKEN_SECRET!);
      const signedOAuthParams = { ...oauthParams, oauth_signature: signature };

      return "OAuth " + Object.entries(signedOAuthParams)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
        .join(", ");
    }

    const url = `https://api.x.com/2/tweets/${tweetId}?tweet.fields=author_id,created_at,text&expansions=author_id&user.fields=name,username,profile_image_url`;
    const oauthHeader = generateOAuthHeader("GET", url.split('?')[0]);

    console.log('Fetching from Twitter API...');
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: oauthHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Twitter API error:", response.status, errorText);
      throw new Error(`Twitter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Twitter API response:', data);
    
    const tweet = data.data;
    const author = data.includes?.users?.[0];

    return new Response(
      JSON.stringify({
        author: author?.name || author?.username || "Twitter User",
        content: tweet.text,
        createdAt: tweet.created_at,
        url: postUrl,
        platform: "X",
        avatarUrl: author?.profile_image_url || null
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching Twitter post:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        author: "X/Twitter User",
        content: "Unable to fetch tweet. Please verify the URL and your API credentials.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
