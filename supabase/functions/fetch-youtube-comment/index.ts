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
    console.log('Fetching YouTube video:', postUrl);

    const CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET");

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("YouTube credentials not configured");
    }

    // Extract video ID from URL
    const videoIdMatch = postUrl.match(/[?&]v=([^&]+)/) || postUrl.match(/youtu\.be\/([^?]+)/);
    if (!videoIdMatch) {
      throw new Error('Invalid YouTube URL format');
    }
    const videoId = videoIdMatch[1];

    // YouTube Data API v3 requires OAuth for most operations
    // For public video data, we can use API key, but comments require OAuth
    return new Response(
      JSON.stringify({
        error: "YouTube API requires OAuth flow for accessing comments. Please implement OAuth authentication.",
        author: "YouTube User",
        content: `YouTube video (${videoId}) comments require OAuth authentication to access.`,
        url: postUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
