import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  LayoutDashboard, 
  BarChart3, 
  Share2, 
  Heart, 
  Video, 
  Code, 
  Palette,
  Shield,
  Sparkles
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      category: "Quick to setup",
      title: "A dedicated landing page",
      description: "Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes.",
    },
    {
      icon: LayoutDashboard,
      category: "Easy to manage",
      title: "A dashboard to manage all reviews",
      description: "You will have a simple & clean dashboard to manage all reviews in one place. It's like your email inbox, but it's designed for your social proof!",
    },
    {
      icon: BarChart3,
      category: "Track the metrics",
      title: "Understand how video reviews are performing",
      description: "Track the metrics from all embedded videos, help your marketing team understand the performance at a glance, even promote the best-performing videos to different marketing channels.",
    },
    {
      icon: Share2,
      category: "More social proof",
      title: "Not only text and video reviews",
      description: "If you have reviews on social media (e.g. Twitter, LinkedIn, TikTok etc), video hosting platforms (e.g. YouTube, Vimeo), and other review sites, bring them all to your account. Hype helps you manage all your social proof in a single place!",
    },
    {
      icon: Heart,
      category: "Wall of Love",
      title: "The best reviews all in one place",
      description: "Treat the Wall of Love as the place to showcase all your favorite reviews. You can embed it to your website in under a minute. No coding knowledge required!",
    },
    {
      icon: Video,
      category: "Video reviews",
      title: "Ad-free hosting for each video",
      description: "For video reviews, you can embed them directly on your own website. You don't need to use any 3rd-party ad-free hosting service.",
    },
    {
      icon: Code,
      category: "Easy embed",
      title: "Embed with just 3 lines of code",
      description: "Copy and paste 3 lines of HTML code to embed reviews anywhere. Works with any website builder or CMS platform.",
    },
    {
      icon: Palette,
      category: "Customization",
      title: "Match your brand perfectly",
      description: "Customize colors, fonts, layouts, and styles to seamlessly integrate reviews with your brand identity.",
    },
    {
      icon: Shield,
      category: "Spam protection",
      title: "Built-in moderation tools",
      description: "Review and approve reviews before they go live. Filter spam automatically and maintain quality control.",
    },
    {
      icon: Sparkles,
      category: "Auto-collect",
      title: "Collect reviews on autopilot",
      description: "Set up automated email campaigns to request reviews after purchase or service completion. Let the reviews flow in automatically.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup={true} />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-reckless text-4xl md:text-5xl font-bold mb-6">
            Collect and display reviews all in one solution
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to gather social proof and showcase it beautifully.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{feature.category}</span>
                </div>
                <h3 className="font-reckless text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <Icon className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <section className="mb-24 py-16 px-8 rounded-2xl bg-primary/5">
          <h2 className="font-reckless text-3xl font-bold mb-12 text-center">Why choose Hype?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-reckless font-semibold mb-2">Setup in 2 minutes</h3>
              <p className="text-sm text-muted-foreground">
                No technical knowledge required. Get started instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-reckless font-semibold mb-2">Beautiful displays</h3>
              <p className="text-sm text-muted-foreground">
                Stunning review widgets that convert visitors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-reckless font-semibold mb-2">Track performance</h3>
              <p className="text-sm text-muted-foreground">
                Analytics to measure your social proof impact.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 px-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
          <h2 className="font-reckless text-3xl font-bold mb-4">
            Ready to collect reviews?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start building trust with social proof today. No credit card required.
          </p>
          <Link to="/signup">
            <Button size="lg">Try Hype Free →</Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
