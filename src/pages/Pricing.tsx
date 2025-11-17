import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  STRIPE_PRO_MONTHLY_URL,
  STRIPE_PRO_YEARLY_URL,
  STRIPE_BUSINESS_MONTHLY_URL,
  STRIPE_BUSINESS_YEARLY_URL,
} from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>("Free");

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // TODO: Fetch actual plan from database
      // For now, defaulting to "Starter" for logged in users
      if (session?.user) {
        setCurrentPlan("Starter");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setCurrentPlan("Starter");
        } else {
          setCurrentPlan("Free");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const plans = [
    {
      name: "Free",
      emoji: "",
      price: "$0",
      yearlyPrice: "$0",
      period: "/month",
      subtitle: "(Forever free)",
      description: "For personal use",
      featuresLabel: "Free forever, features include:",
      features: [
        "1 reviews page",
        "10 video reviews in total",
        "50 text reviews in total",
        "Public Reviews page",
        "Basic analytics",
      ],
      cta: "Get started for free",
      highlighted: false,
    },
    {
      name: "Pro",
      emoji: "",
      price: "$19",
      yearlyPrice: "$15.83",
      period: "/month",
      subtitle: "($250 billed annually)",
      description: "For small teams",
      featuresLabel: "Everything in Free, and:",
      features: [
        "5 reviews pages",
        "Unlimited text reviews",
        "2 minutes video time limit",
        "AI case study generator",
        "Page localization",
        "Public Reviews page",
        "Remove our branding from all widgets",
        "1 day email support",
        "Advanced analytics with insights",
      ],
      cta: "Start 7-day free trial",
      highlighted: false,
      monthlyCheckoutUrl: STRIPE_PRO_MONTHLY_URL,
      yearlyCheckoutUrl: STRIPE_PRO_YEARLY_URL,
    },
    {
      name: "Business",
      emoji: "",
      price: "$49",
      yearlyPrice: "$40.83",
      period: "/month/space",
      subtitle: "($400 billed annually)",
      description: "For growing products",
      featuresLabel: "Everything in Pro, and:",
      features: [
        "20 reviews pages",
        "Unlimited reviews",
        "500 automated monthly invitations via T.E.A.",
        "3 minutes video time limit",
        "Custom cards on Wall of Love",
        "eGift cards integration",
        "Scheduling",
        "Public Reviews page",
        "Custom colors on widget",
        "Priority email and chat support",
        "Premium analytics with custom reports",
      ],
      cta: "Start 7-day free trial",
      highlighted: true,
      monthlyCheckoutUrl: STRIPE_BUSINESS_MONTHLY_URL,
      yearlyCheckoutUrl: STRIPE_BUSINESS_YEARLY_URL,
    },
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and debit cards through Stripe."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans include a 7-day free trial. No credit card required."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. Cancel your subscription anytime with no questions asked."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {user ? <AuthenticatedHeader /> : <Header showSignup />}

      {/* Pricing Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="font-reckless text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-tight">
          The easiest way to drive more sales
          <br />
          for your business
        </h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto">
          Start with some text reviews and video reviews on us, then upgrade to our paid plan only if you're happy.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Billed Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Billed Yearly
          </span>
          {isYearly && (
            <span className="bg-[hsl(142,71%,90%)] text-[hsl(142,71%,30%)] px-3 py-1 rounded-lg text-xs font-medium">
              2 months off 🎁
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 rounded-2xl border flex flex-col relative ${
                plan.highlighted
                  ? "border-primary shadow-lg"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-reckless text-2xl font-medium mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description} {plan.emoji}
                </p>
              </div>

              <div className="text-center mb-2">
                <span className="text-5xl font-bold">
                  {isYearly && plan.yearlyPrice !== plan.price ? plan.yearlyPrice : plan.price}
                </span>
                <span className="text-muted-foreground text-lg">{plan.period}</span>
              </div>
              
              {plan.subtitle && (
                <p className="text-center text-sm text-muted-foreground mb-6">
                  {isYearly ? plan.subtitle : plan.subtitle}
                </p>
              )}

              <div className="mb-6">
                <p className="font-semibold text-sm mb-4 border-b pb-2">{plan.featuresLabel}</p>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-0.5 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.name === "Free" ? (
                user ? (
                  currentPlan === "Free" ? (
                    <Button
                      className="w-full rounded-lg mt-auto"
                      variant="outline"
                      size="lg"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Link to="/dashboard" className="mt-auto">
                      <Button
                        className="w-full rounded-lg"
                        variant={plan.highlighted ? "default" : "outline"}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )
                ) : (
                  <Link to="/signup" className="mt-auto">
                    <Button
                      className="w-full rounded-lg"
                      variant={plan.highlighted ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )
              ) : (
                currentPlan === plan.name ? (
                  <Button
                    className="w-full rounded-lg mt-auto"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <a
                      href={isYearly ? plan.yearlyCheckoutUrl : plan.monthlyCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Manage Subscription
                    </a>
                  </Button>
                ) : (
                  <Button
                    className="w-full rounded-lg mt-auto"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <a
                      href={isYearly ? plan.yearlyCheckoutUrl : plan.monthlyCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.cta}
                    </a>
                  </Button>
                )
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-16 mb-20">
        <h2 className="font-sans text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-sans font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
