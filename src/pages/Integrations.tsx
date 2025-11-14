import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const integrations = [
    { name: "Notion", category: "Productivity" },
    { name: "Webflow", category: "Website Builder" },
    { name: "WordPress", category: "CMS" },
    { name: "Shopify", category: "eCommerce" },
    { name: "Wix", category: "Website Builder" },
    { name: "Squarespace", category: "Website Builder" },
    { name: "Bubble", category: "No-Code" },
    { name: "ReactJS", category: "Framework" },
    { name: "Next.js", category: "Framework" },
    { name: "Framer", category: "Design Tool" },
    { name: "Carrd", category: "Landing Pages" },
    { name: "ConvertKit", category: "Email Marketing" },
    { name: "Mailchimp", category: "Email Marketing" },
    { name: "HubSpot", category: "CRM" },
    { name: "Salesforce", category: "CRM" },
    { name: "Zapier", category: "Automation" },
    { name: "Make", category: "Automation" },
    { name: "Slack", category: "Communication" },
    { name: "Discord", category: "Community" },
    { name: "Google Analytics", category: "Analytics" },
  ];

  const categories = [...new Set(integrations.map((i) => i.category))];

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup={true} />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-reckless text-4xl md:text-5xl font-bold mb-6">
            Import customer testimonials and embed them on any platform
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We built the ultimate tool for showcasing your satisfied customers. With 3-lines of HTML code, you can embed all your testimonials to any platform!
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Integration Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg bg-secondary">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-muted-foreground">Platform Integrations</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary">
            <div className="text-4xl font-bold mb-2">3 Lines</div>
            <div className="text-muted-foreground">Of Code to Embed</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary">
            <div className="text-4xl font-bold mb-2">2 Min</div>
            <div className="text-muted-foreground">Setup Time</div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="font-reckless text-2xl font-bold mb-4">Browse by category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="mb-16">
          <h2 className="font-reckless text-2xl font-bold mb-6">All Integrations</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {filteredIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="p-6 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary">
                    {integration.name[0]}
                  </span>
                </div>
                <h3 className="font-reckless font-semibold mb-1">{integration.name}</h3>
                <p className="text-sm text-muted-foreground">{integration.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <section className="mb-16 py-16 px-8 rounded-2xl bg-primary/5">
          <h2 className="font-reckless text-3xl font-bold mb-12 text-center">How embedding works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-reckless font-semibold mb-2">Collect testimonials</h3>
              <p className="text-sm text-muted-foreground">
                Gather testimonials through your custom landing page or import from social media.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-reckless font-semibold mb-2">Copy embed code</h3>
              <p className="text-sm text-muted-foreground">
                Get your unique embed code with just one click from your dashboard.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-reckless font-semibold mb-2">Paste on any platform</h3>
              <p className="text-sm text-muted-foreground">
                Add the code to your website, landing page, or any platform that supports HTML.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 px-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
          <h2 className="font-reckless text-3xl font-bold mb-4">
            Ready to embed testimonials everywhere?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start collecting and displaying social proof on all your platforms today.
          </p>
          <Link to="/signup">
            <Button size="lg">Get Started Free →</Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Integrations;
