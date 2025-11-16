import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";

const ReviewsPages = () => {
  const reviewPages = [
    {
      name: "Public Reviews",
      description: "Your public testimonials page",
      url: "/reviews/test",
      icon: Heart,
    },
    {
      name: "Wall of Love",
      description: "Embedded testimonial widget",
      url: "/embeds/wall-of-love",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={hypeLogo} alt="Hype" className="h-8" />
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-reckless text-4xl font-medium mb-4">Reviews Pages</h1>
          <p className="text-lg text-muted-foreground mb-12">
            View and manage your public reviews pages
          </p>

          <div className="space-y-4">
            {reviewPages.map((page) => {
              const Icon = page.icon;
              return (
                <Card key={page.name} className="p-6 border-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-reckless text-xl font-medium mb-1">{page.name}</h3>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </div>
                    <Link to={page.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewsPages;
