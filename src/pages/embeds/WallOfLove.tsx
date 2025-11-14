import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, ArrowLeft } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";

const WallOfLove = () => {
  const [copied, setCopied] = useState(false);
  
  const embedCode = `<script async type="text/javascript" src="https://testimonial.to/js/widget-embed.js"></script>
<div class="testimonial-wall-of-love" data-url="https://embed-v2.testimonial.to/w/wall-of-love?theme=light" data-resize="on"></div>`;

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
          <h1 className="font-reckless text-4xl font-medium mb-2">Wall of Love</h1>
          <p className="text-muted-foreground">Display all your testimonials in a beautiful masonry grid</p>
        </div>

        {/* Preview */}
        <Card className="p-8 mb-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-4">Preview</h2>
          <div className="bg-muted/30 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">Wall of Love widget preview would appear here</p>
          </div>
        </Card>

        {/* Embed Code */}
        <Card className="p-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-4">Embed Code</h2>
          <p className="text-muted-foreground mb-4">
            Copy and paste this code into your website where you want the Wall of Love to appear.
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
              <li>• Adjust number of columns by adding data-columns="3"</li>
              <li>• Set maximum height with data-max-height="600"</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WallOfLove;
