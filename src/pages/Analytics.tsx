import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { TrendingUp, Eye, ThumbsUp, Share2 } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";

const Analytics = () => {
  const stats = [
    { label: "Total Views", value: "1,234", icon: Eye, color: "google-blue" },
    { label: "Total Reviews", value: "56", icon: ThumbsUp, color: "google-green" },
    { label: "Engagement Rate", value: "12.5%", icon: TrendingUp, color: "google-yellow" },
    { label: "Shares", value: "89", icon: Share2, color: "google-red" },
  ];

  const pageAnalytics = [
    {
      name: "Public Reviews",
      views: 856,
      engagement: "14.2%",
      reviews: 42,
    },
    {
      name: "Wall of Love",
      views: 378,
      engagement: "9.8%",
      reviews: 14,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Return to Dashboard
            </Link>
            <img src={hypeLogo} alt="Hype" className="h-8" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-reckless text-4xl font-medium mb-4">Analytics</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Track performance of your reviews pages
          </p>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6 border-2">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="font-reckless text-3xl font-medium">{stat.value}</p>
                </Card>
              );
            })}
          </div>

          {/* Page Analytics */}
          <div className="space-y-6">
            <h2 className="font-reckless text-2xl font-medium">Page Performance</h2>
            {pageAnalytics.map((page) => (
              <Card key={page.name} className="p-6 border-2">
                <h3 className="font-reckless text-xl font-medium mb-4">{page.name}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Views</p>
                    <p className="text-2xl font-medium">{page.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Engagement</p>
                    <p className="text-2xl font-medium">{page.engagement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reviews</p>
                    <p className="text-2xl font-medium">{page.reviews}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
