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
    console.log('Fetching LinkedIn post:', postUrl);

    const CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET");

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("LinkedIn credentials not configured");
    }

    // Note: LinkedIn's API requires user OAuth tokens which need a proper OAuth flow
    // For now, we'll extract what we can from the URL and return structured data
    // Full implementation would require: OAuth flow -> Get access token -> Fetch post
    
    console.log('LinkedIn API integration requires OAuth flow implementation');
    console.log('For full implementation, please visit: https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication');

    // Return a helpful message explaining OAuth is needed
    return new Response(
      JSON.stringify({
        author: "LinkedIn User",
        content: "LinkedIn post import requires a complete OAuth 2.0 flow. Please implement user authentication to fetch real LinkedIn posts. For now, manually copy the post content.",
        url: postUrl,
        platform: "LinkedIn",
        note: "Full OAuth implementation needed for automated import"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-linkedin-post:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        author: "LinkedIn User",
        content: "Unable to fetch LinkedIn post. OAuth flow required.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
