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
    console.log('Fetching Instagram post:', postUrl);

    // Try Instagram oEmbed API (public posts only)
    const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=${Deno.env.get("INSTAGRAM_CLIENT_ID")}|${Deno.env.get("INSTAGRAM_CLIENT_SECRET")}`;
    
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      throw new Error('Unable to fetch Instagram post. The post may be private or the URL is invalid.');
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        author: data.author_name || "Instagram User",
        content: data.title || "",
        thumbnailUrl: data.thumbnail_url,
        url: postUrl,
        platform: "Instagram",
        html: data.html
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
