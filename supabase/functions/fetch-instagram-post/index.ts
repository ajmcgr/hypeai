import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postUrl } = await req.json();
    console.log('Fetching Instagram post:', postUrl);

    const CLIENT_ID = Deno.env.get("INSTAGRAM_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("INSTAGRAM_CLIENT_SECRET");

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Instagram credentials not configured");
    }

    // Instagram Graph API requires OAuth tokens and proper permissions
    // This is a simplified implementation
    return new Response(
      JSON.stringify({
        error: "Instagram API requires OAuth flow setup and user access tokens. Please implement OAuth authentication in your app.",
        author: "Instagram User",
        content: "Instagram post content requires OAuth authentication to access.",
        url: postUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching Instagram post:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
