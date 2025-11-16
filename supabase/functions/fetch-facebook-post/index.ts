import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    const { postUrl } = await req.json();
    console.log('Fetching Facebook post:', postUrl);

    const CLIENT_ID = Deno.env.get("FACEBOOK_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("FACEBOOK_CLIENT_SECRET");

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Facebook credentials not configured");
    }

    // Facebook Graph API requires OAuth tokens and proper permissions
    return new Response(
      JSON.stringify({
        error: "Facebook API requires OAuth flow setup and user access tokens. Please implement OAuth authentication in your app.",
        author: "Facebook User",
        content: "Facebook post content requires OAuth authentication to access.",
        url: postUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching Facebook post:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
