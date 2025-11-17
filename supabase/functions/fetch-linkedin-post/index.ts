import { corsHeaders, handleOptions } from "../_shared/cors.ts"

// Supabase Edge Function stub for LinkedIn
// Later I will add real fetch and parsing logic here

Deno.serve(async (req: Request) => {
  // CORS preflight
  const opt = handleOptions(req)
  if (opt) return opt

  let url: string | undefined
  let extra: Record<string, unknown> | undefined

  try {
    if (req.method === "POST") {
      const body = await req.json()
      url = body.url
      extra = body.extra
    }
  } catch {
    // ignore JSON errors for now
  }

  // TODO: implement real fetch and parsing for LinkedIn
  // For now, this is just a debug stub.
  const result = {
    success: true,
    platform: "linkedin",
    url: url ?? null,
    extra: extra ?? null,
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  })
})
