import { supabase } from "../supabase";

export type ReviewSource =
  | "facebook"
  | "x"
  | "linkedin"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "threads"
  | "google"
  | "yelp"
  | "g2"
  | "appsumo"
  | "amazon"
  | "capterra"
  | "producthunt";

export async function importReview(source: ReviewSource, url: string) {
  const { data, error } = await supabase.functions.invoke("import-review", {
    body: { source, url },
  });

  if (error) {
    console.error("import-review failed", error);
    throw error;
  }

  return data;
}
