// supabase/functions/_shared/cors.ts

export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*", // I will lock this down to https://tryhype.ai later
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

export function handleOptions(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }
  return null
}
