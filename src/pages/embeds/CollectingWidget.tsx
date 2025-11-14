import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, ArrowLeft, Video, FileText, ThumbsUp } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";

const CollectingWidget = () => {
  const [copied, setCopied] = useState(false);
  
  const embedCode = `<script async type="text/javascript" src="https://testimonial.to/js/widget-embed.js"></script>
<div class="testimonial-to-embed" data-url="https://embed-v2.testimonial.to/c/test266?theme=light" data-resize="on"></div>`;

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
          <h1 className="font-reckless text-4xl font-medium mb-2">Add collecting widget to your own website</h1>
          <p className="text-muted-foreground">Embed your testimonial collection form directly on your website</p>
        </div>

        {/* Preview */}
        <Card className="p-8 mb-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-6">Preview</h2>
          <div className="bg-card border-2 rounded-xl p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-reckless text-3xl font-medium mb-2">Test</h2>
              <p className="text-muted-foreground">Test</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">QUESTIONS</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Who are you / what are you working on?</li>
                <li>• How has [our product / service] helped you?</li>
                <li>• What is the best thing about [our product / service]?</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 gap-2 py-6">
                <Video className="w-5 h-5" />
                Record a video
              </Button>
              <Button variant="secondary" className="flex-1 gap-2 py-6">
                <FileText className="w-5 h-5" />
                Send in text
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Powered by Testimonial ❤️
            </p>
          </div>
        </Card>

        {/* Embed Code */}
        <Card className="p-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-4">Embed Code</h2>
          <p className="text-muted-foreground mb-4">
            You can embed your Testimonial's public landing page as a widget to your own website.
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
            <h3 className="font-semibold mb-2">How it works</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>1. Copy the embed code above</li>
              <li>2. Paste it into your website's HTML where you want the form to appear</li>
              <li>3. The widget will automatically resize to fit your page</li>
              <li>4. Testimonials collected will appear in your dashboard</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CollectingWidget;
