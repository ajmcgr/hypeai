import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      emoji: "🥁",
      price: "$0",
      yearlyPrice: "$0",
      period: "/month",
      subtitle: "(Forever free)",
      description: "For hobbies",
      featuresLabel: "Free forever, features include:",
      features: [
        "1 space",
        "2 video testimonials in total",
        "10 text testimonials in total",
        "Unlimited X, LinkedIn posts importing",
        "Public Testimonial page",
        "Wall of Love widget with our logo",
      ],
      cta: "Get started for free",
      highlighted: false,
    },
    {
      name: "Pro",
      emoji: "🏠",
      price: "$21",
      yearlyPrice: "$17.5",
      period: "/month",
      subtitle: "($250 billed annually)",
      description: "For small teams",
      featuresLabel: "Everything in Free, and:",
      features: [
        "Unlimited text testimonials",
        "2 video testimonials in total",
        "10+ other social media and review sites importing",
        "AI case study generator",
        "Page localization",
        "Remove our branding from all widgets",
        "1 day email support",
      ],
      cta: "Start 7-day free trial",
      highlighted: false,
    },
    {
      name: "Business",
      emoji: "🚀",
      price: "$34",
      yearlyPrice: "$28.3",
      period: "/month/space",
      subtitle: "($400 billed annually)",
      description: "For growing businesses",
      featuresLabel: "Everything in Pro, and:",
      features: [
        "Unlimited testimonials",
        "500 automated monthly invitations via T.E.A.",
        "3 minutes video time limit",
        "Custom cards on Wall of Love",
        "eGift cards integration",
        "Scheduling",
        "Custom colors on widget",
        "Priority email and chat support",
      ],
      cta: "Start 7-day free trial",
      highlighted: true,
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
      <Header showSignup />

      {/* Pricing Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="font-reckless text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-tight">
          The easiest way to drive more sales
          <br />
          for your business
        </h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto">
          Start with 10 text testimonials and 2 video testimonials on us, then upgrade to our paid plan only if you're happy.
        </p>
        
        {/* Trial Badge */}
        <div className="inline-block bg-[hsl(45,100%,90%)] text-[hsl(45,100%,30%)] px-4 py-2 rounded-lg font-medium mb-8">
          7 days free trial, cancel anytime!
        </div>

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

              <Link to="/signup" className="mt-auto">
                <Button
                  className="w-full rounded-lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
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
                <AccordionTrigger className="text-left font-reckless font-semibold">
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
