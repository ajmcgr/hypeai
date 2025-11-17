import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Resolve Stripe customer by email with fallback to Search API
    let customerId: string | null = null;

    const customersList = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customersList.data.length > 0) {
      customerId = customersList.data[0].id;
      logStep("Found Stripe customer (list)", { customerId });
    } else {
      try {
        const search = await stripe.customers.search({
          query: `email:"${user.email}"`,
          limit: 1,
        });
        if (search.data.length > 0) {
          customerId = search.data[0].id;
          logStep("Found Stripe customer (search)", { customerId });
        }
      } catch (e) {
        logStep("Stripe customers.search failed", { error: e instanceof Error ? e.message : String(e) });
      }
    }

    if (!customerId) {
      logStep("No customer found, returning free plan");
      return new Response(JSON.stringify({ 
        subscribed: false, 
        plan: "Free",
        product_id: null,
        subscription_end: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerIdFinal = customerId;
    // Fetch all subscriptions and determine if any is effectively active
    const allSubs = await stripe.subscriptions.list({
      customer: customerId,
      // Do not filter by status here so we can consider trialing/past_due as active access
      limit: 10,
    });

    // Treat these statuses as granting access
    const ACCESS_STATUSES = new Set(["active", "trialing", "past_due", "unpaid"]);
    const effectiveSub = allSubs.data.find((s: Stripe.Subscription) => ACCESS_STATUSES.has(s.status));

    const hasActiveSub = Boolean(effectiveSub);
    let productId = null;
    let subscriptionEnd = null;
    let planName = "Free";

    if (hasActiveSub && effectiveSub) {
      subscriptionEnd = new Date(effectiveSub.current_period_end * 1000).toISOString();
      logStep("Effective subscription found", { subscriptionId: effectiveSub.id, status: effectiveSub.status, endDate: subscriptionEnd });

      productId = effectiveSub.items.data[0].price.product as string;

      // Get product details to determine plan name
      const product = await stripe.products.retrieve(productId);
      // Remove " Plan" suffix if present to match pricing page names
      planName = product.name.replace(/ Plan$/i, '');

      logStep("Determined subscription plan", { productId, planName, originalName: product.name });
    } else {
      logStep("No active or trialing subscription found");
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      plan: planName,
      product_id: productId,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
