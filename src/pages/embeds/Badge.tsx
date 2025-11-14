import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, ArrowLeft, Star } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";

const Badge = () => {
  const [copied, setCopied] = useState(false);
  
  const embedCode = `<script async type="text/javascript" src="https://testimonial.to/js/widget-embed.js"></script>
<div class="testimonial-badge" data-url="https://embed-v2.testimonial.to/b/badge123?theme=light"></div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <img src={hypeLogo} alt="Hype" className="h-8" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-reckless text-4xl font-medium mb-2">Badge Widget</h1>
          <p className="text-muted-foreground">Show off your social proof with a compact badge widget</p>
        </div>

        {/* Preview */}
        <Card className="p-8 mb-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-4">Preview</h2>
          <div className="flex justify-center items-center py-8">
            <Card className="px-6 py-4 rounded-xl border-2 inline-flex items-center gap-3">
              <div className="flex gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">5.0 rating</p>
                <p className="text-xs text-muted-foreground">from 127 reviews</p>
              </div>
            </Card>
          </div>
        </Card>

        {/* Embed Code */}
        <Card className="p-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-4">Embed Code</h2>
          <p className="text-muted-foreground mb-4">
            Copy and paste this code into your website where you want the badge to appear.
          </p>
          
          <div className="relative">
            <pre className="bg-card border-2 border-border rounded-lg p-4 overflow-x-auto text-sm">
              <code>{embedCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-2">Customization Options</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Change theme to "dark" for dark mode</li>
              <li>• Add data-style="compact" for a smaller badge</li>
              <li>• Show/hide star rating with data-show-stars="true/false"</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Badge;
