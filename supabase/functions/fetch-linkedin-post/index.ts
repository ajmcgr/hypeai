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

    // Return mock data for now (LinkedIn API requires OAuth setup)
    return new Response(
      JSON.stringify({
        author: "LinkedIn User",
        content: "This is a sample review imported from LinkedIn. To fetch real LinkedIn posts, OAuth authentication is required.",
        url: postUrl,
        platform: "LinkedIn"
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
        content: "Unable to fetch LinkedIn post. Please check the URL.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
