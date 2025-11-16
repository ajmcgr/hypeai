import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    const { postUrl } = await req.json();
    console.log('Fetching Instagram post:', postUrl);

    const CLIENT_ID = Deno.env.get("INSTAGRAM_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("INSTAGRAM_CLIENT_SECRET");

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Instagram credentials not configured");
    }

    // Note: Instagram Graph API requires user OAuth tokens
    // Full implementation requires: OAuth flow -> Get user access token -> Fetch post
    
    console.log('Instagram API integration requires OAuth flow implementation');
    console.log('For full implementation, please visit: https://developers.facebook.com/docs/instagram-basic-display-api');

    return new Response(
      JSON.stringify({
        author: "Instagram User",
        content: "Instagram post import requires a complete OAuth 2.0 flow. Please implement user authentication to fetch real Instagram posts. For now, manually copy the post content.",
        url: postUrl,
        platform: "Instagram",
        note: "Full OAuth implementation needed for automated import"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-instagram-post:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        author: "Instagram User",
        content: "Unable to fetch Instagram post. OAuth flow required.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
