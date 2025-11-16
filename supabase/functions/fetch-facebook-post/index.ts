import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    const reqHeaders = req.headers.get('Access-Control-Request-Headers');
    const headers = {
      ...corsHeaders,
      ...(reqHeaders ? { 'Access-Control-Allow-Headers': reqHeaders } : {}),
    } as Record<string, string>;
    return new Response('ok', { headers });
  }

  try {
    const { postUrl } = await req.json();
    console.log('Fetching Facebook post:', postUrl);

    const CLIENT_ID = Deno.env.get("FACEBOOK_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("FACEBOOK_CLIENT_SECRET");

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Facebook credentials not configured");
    }

    // Try Facebook oEmbed API (public posts only)
    const accessToken = `${CLIENT_ID}|${CLIENT_SECRET}`;
    const oembedUrl = `https://graph.facebook.com/v18.0/oembed_post?url=${encodeURIComponent(postUrl)}&access_token=${accessToken}`;
    
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      throw new Error('Unable to fetch Facebook post. The post may be private or the URL is invalid.');
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        author: data.author_name || "Facebook User",
        content: data.title || "",
        url: postUrl,
        platform: "Facebook",
        html: data.html
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-facebook-post:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        author: "Facebook User",
        content: "Unable to fetch Facebook post. OAuth flow required.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
