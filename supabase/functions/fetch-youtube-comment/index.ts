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
    console.log('Fetching YouTube comment:', postUrl);

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

    console.log('YouTube API integration requires OAuth flow for comments');
    console.log('For full implementation, please visit: https://developers.google.com/youtube/v3/docs/comments');

    // Return a helpful message explaining OAuth is needed for comments
    return new Response(
      JSON.stringify({
        author: "YouTube User",
        content: "YouTube comment import requires OAuth 2.0 authentication. Please implement user authentication to fetch real YouTube comments. For now, manually copy the comment content.",
        url: postUrl,
        platform: "YouTube",
        note: "Full OAuth implementation needed for automated comment import"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-youtube-comment:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        author: "YouTube User",
        content: "Unable to fetch YouTube comment. OAuth flow required.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
