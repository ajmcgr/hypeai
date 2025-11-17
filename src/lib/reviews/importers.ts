import { supabase } from "../supabase";

const call = async (func: string, url: string) => {
  const { data, error } = await supabase.functions.invoke(func, {
    body: { url },
  });
  if (error) throw error;
  return data;
};

export const importReview = {
  facebook: (url: string) => call("fetch-facebook-post", url),
  x: (url: string) => call("fetch-x-post", url),
  linkedin: (url: string) => call("fetch-linkedin-post", url),
  tiktok: (url: string) => call("fetch-tiktok-post", url),
  instagram: (url: string) => call("fetch-instagram-post", url),
  youtube: (url: string) => call("fetch-youtube-post", url),
  threads: (url: string) => call("fetch-threads-post", url),
  google: (url: string) => call("fetch-google-review", url),
  yelp: (url: string) => call("fetch-yelp-review", url),
  g2: (url: string) => call("fetch-g2-review", url),
  appsumo: (url: string) => call("fetch-appsumo-review", url),
  amazon: (url: string) => call("fetch-amazon-review", url),
  capterra: (url: string) => call("fetch-capterra-review", url),
  producthunt: (url: string) => call("fetch-producthunt-review", url),
};
