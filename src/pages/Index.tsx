import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Import, Video, Sparkles, Twitter, Linkedin, Instagram, Facebook, Youtube, ChevronDown, Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="font-reckless text-5xl md:text-6xl font-medium mb-6 tracking-tight">
          Gather social proof.
          <br />
          <span className="text-foreground">Build worth of mouth</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The easiest way for creators to collect and display testimonials that drive results, all in one place.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/signup">
            <Button size="lg" className="text-xl px-10 py-7 rounded-2xl">
              Start Collecting Free →
            </Button>
          </Link>
          <div className="senja-embed" data-id="eacf7a79-5b6c-4a80-9f5a-0e6dfe631ec6" data-mode="shadow" data-lazyload="false"></div>
        </div>
        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl border border-border bg-card p-8">
          <div className="bg-muted/30 rounded-2xl aspect-video flex items-center justify-center">
            <div className="flex gap-4">
              <Star className="w-12 h-12 text-primary fill-primary" />
              <Star className="w-12 h-12 text-primary fill-primary" />
              <Star className="w-12 h-12 text-primary fill-primary" />
              <Star className="w-12 h-12 text-primary fill-primary" />
              <Star className="w-12 h-12 text-primary fill-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-reckless text-4xl font-medium mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to social proof success</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center rounded-3xl border-2">
            <div className="w-16 h-16 rounded-2xl bg-google-blue/10 flex items-center justify-center mx-auto mb-4">
              <Import className="w-8 h-8 text-google-blue" />
            </div>
            <h3 className="font-reckless text-xl font-semibold mb-2">Import Testimonials</h3>
            <p className="text-muted-foreground">
              Automatically import testimonials from over 10 platforms including Twitter, LinkedIn, Instagram, and more.
            </p>
          </Card>
          <Card className="p-8 text-center rounded-3xl border-2">
            <div className="w-16 h-16 rounded-2xl bg-google-red/10 flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-google-red" />
            </div>
            <h3 className="font-reckless text-xl font-semibold mb-2">Collect on Autopilot</h3>
            <p className="text-muted-foreground">
              Gather text and video testimonials automatically with customizable forms and automated follow-ups.
            </p>
          </Card>
          <Card className="p-8 text-center rounded-3xl border-2">
            <div className="w-16 h-16 rounded-2xl bg-google-green/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-google-green" />
            </div>
            <h3 className="font-reckless text-xl font-semibold mb-2">Showcase Everywhere</h3>
            <p className="text-muted-foreground">
              Display beautiful testimonial widgets on your website, in emails, and across all your social channels.
            </p>
          </Card>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="container mx-auto px-6 py-20 bg-muted/30 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="font-reckless text-4xl font-medium mb-4">Import from 10+ platforms</h2>
          <p className="text-lg text-muted-foreground">Collect testimonials from everywhere your customers are</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <Twitter className="w-6 h-6 text-google-blue" />
            <span className="font-medium">Twitter / X</span>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <Linkedin className="w-6 h-6 text-google-blue" />
            <span className="font-medium">LinkedIn</span>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <Instagram className="w-6 h-6 text-google-red" />
            <span className="font-medium">Instagram</span>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <Facebook className="w-6 h-6 text-google-blue" />
            <span className="font-medium">Facebook</span>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <Youtube className="w-6 h-6 text-google-red" />
            <span className="font-medium">YouTube</span>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <svg className="w-6 h-6" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z" fill="url(#a)"/>
              <path d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z" fill="url(#b)"/>
              <path d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z" fill="url(#c)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M96 30c-14.152 0-24.336.007-32.276.777-7.849.76-12.87 2.223-16.877 4.74a36 36 0 0 0-11.33 11.33c-2.517 4.007-3.98 9.028-4.74 16.877C30.007 71.663 30 81.847 30 96v-.054l32.284-32.284a6 6 0 0 1 8.486 0l13.526 13.526 44.758-44.757A6 6 0 0 1 133.296 30H96Z" fill="#000" fill-opacity=".4"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M96 162c14.152 0 24.336-.007 32.276-.777 7.849-.761 12.87-2.223 16.877-4.741a36 36 0 0 0 11.329-11.329c2.518-4.007 3.98-9.028 4.741-16.877.77-7.94.777-18.124.777-32.276v-5.59l-8.122 8.121a6 6 0 0 1-8.485 0l-22.269-22.269-44.758 44.758a6 6 0 0 1-8.485 0l-13.526-13.526L30 134.024C30.653 146.927 32.284 155.052 38.153 162H96Z" fill="#000" fill-opacity=".4"/>
              <defs>
                <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45 -10.339 113.339) scale(175.388)">
                  <stop stop-color="#FFF478"/>
                  <stop offset=".474" stop-color="#FFB02E"/>
                  <stop offset="1" stop-color="#F70A8D"/>
                </radialGradient>
                <radialGradient id="b" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45 -10.339 113.339) scale(175.388)">
                  <stop stop-color="#FFF478"/>
                  <stop offset=".474" stop-color="#FFB02E"/>
                  <stop offset="1" stop-color="#F70A8D"/>
                </radialGradient>
                <radialGradient id="c" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(38.66608 0 0 39.02743 30.688 160.832)">
                  <stop stop-color="#3771C8"/>
                  <stop offset="1" stop-color="#3771C8" stop-opacity="0"/>
                </radialGradient>
              </defs>
            </svg>
            <span className="font-medium">Threads</span>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl border border-border">
            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
            </svg>
            <span className="font-medium">TikTok</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-reckless text-4xl font-medium mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about Hype</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem 
            question="How do I import testimonials?"
            answer="Simply connect your social accounts and Hype will automatically import testimonials from Twitter, LinkedIn, Instagram, Facebook, and more. You can also manually add testimonials or use our collection forms."
          />
          <FAQItem 
            question="Which platforms are supported?"
            answer="Hype supports importing testimonials from over 10 platforms including Twitter/X, LinkedIn, Instagram, Facebook, YouTube, TikTok, Threads, Product Hunt, G2, Trustpilot, and more."
          />
          <FAQItem 
            question="Can I collect video testimonials?"
            answer="Yes! Hype makes it easy to collect both text and video testimonials. Send custom forms to your customers and they can record video testimonials directly from their browser or phone."
          />
          <FAQItem 
            question="Is there a free plan?"
            answer="Yes, we offer a free plan that includes up to 10 testimonials and basic widgets. Perfect for getting started. Upgrade anytime for unlimited testimonials and advanced features."
          />
          <FAQItem 
            question="How do I display testimonials on my website?"
            answer="Choose from beautiful pre-built widgets, customize them to match your brand, and embed them anywhere on your website with a simple code snippet. No coding skills required."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="font-reckless text-4xl font-medium mb-6">Ready to build trust with social proof?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators who showcase testimonials that convert with Hype.
        </p>
        <Link to="/signup">
          <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
            Start Collecting Free →
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-2 rounded-2xl overflow-hidden">
        <CollapsibleTrigger className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
          <h3 className="font-reckless font-semibold text-lg pr-4">{question}</h3>
          <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-6 pb-6">
          <p className="text-muted-foreground">{answer}</p>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default Index;
