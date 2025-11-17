import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "https://tryhype.ai", // use "*" for testing if needed
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

serve(async (req: Request) => {
  // 1. CORS preflight handler
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    })
  }

  let body: unknown = null
  try {
    if (req.method !== "GET") {
      body = await req.json()
    }
  } catch {
    // ignore parse errors. this is just a debug endpoint
  }

  const result = {
    success: true,
    method: req.method,
    body,
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  })
})
