// supabase/functions/_shared/cors.ts

export const corsHeaders: Record<string, string> = {
  // During development you can use "*"
  // For production use the exact origin
  "Access-Control-Allow-Origin": "https://tryhype.ai",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// Call this at the top of each Edge Function
export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }
  return null;
}
