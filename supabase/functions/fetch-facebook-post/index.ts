// supabase/functions/fetch-facebook-post/index.ts

// Minimal guaranteed CORS handler
// No imports on purpose. Cannot fail on missing modules.

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*", // Will restrict later
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  // Echo request info for testing
  let body: unknown = null
  try {
    if (req.method !== "GET") {
      body = await req.json()
    }
  } catch {
    // ignore JSON parse errors in debug mode
  }

  return new Response(
    JSON.stringify({
      ok: true,
      method: req.method,
      body,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    },
  )
})
