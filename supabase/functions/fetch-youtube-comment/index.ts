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
    console.log('Fetching YouTube video:', postUrl);

    // Extract video ID from URL
    const videoIdMatch = postUrl.match(/[?&]v=([^&]+)/) || postUrl.match(/youtu\.be\/([^?]+)/);
    if (!videoIdMatch) {
      throw new Error('Invalid YouTube URL format');
    }
    const videoId = videoIdMatch[1];

    // Use YouTube oEmbed API (no authentication required for public videos)
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(postUrl)}&format=json`;
    const oembedResponse = await fetch(oembedUrl);
    
    if (!oembedResponse.ok) {
      throw new Error('Failed to fetch video data');
    }

    const oembedData = await oembedResponse.json();
    
    // Extract video details
    return new Response(
      JSON.stringify({
        author: oembedData.author_name || "YouTube User",
        content: oembedData.title || "",
        videoUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: oembedData.thumbnail_url,
        url: postUrl,
        platform: "YouTube",
        html: oembedData.html
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-youtube-video:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        author: "YouTube User",
        content: "Unable to fetch YouTube video data.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
