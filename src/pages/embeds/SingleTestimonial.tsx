import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, ArrowLeft, Video, FileText } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";
import alexMacgregor from "@/assets/alex-macgregor.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SingleTestimonial = () => {
  const [copied, setCopied] = useState(false);
  const [embedType, setEmbedType] = useState<"video" | "text">("video");
  
  const videoEmbedCode = `<script async type="text/javascript" src="https://testimonial.to/js/widget-embed.js"></script>
<div class="testimonial-single-video" data-url="https://embed-v2.testimonial.to/t/video123?theme=light"></div>`;

  const textEmbedCode = `<script async type="text/javascript" src="https://testimonial.to/js/widget-embed.js"></script>
<div class="testimonial-single-text" data-url="https://embed-v2.testimonial.to/t/text456?theme=light"></div>`;

  const embedCode = embedType === "video" ? videoEmbedCode : textEmbedCode;

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
          <h1 className="font-reckless text-4xl font-medium mb-2">Embed a single testimonial</h1>
          <p className="text-muted-foreground">Aside from Wall of Love, you have the option to easily embed a video or text testimonial to your website.</p>
        </div>

        {/* Type Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              embedType === "video" ? "border-primary bg-primary/5" : "hover:border-primary/50"
            }`}
            onClick={() => setEmbedType("video")}
          >
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <img src={alexMacgregor} alt="Video testimonial" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Video className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-center">Video testimonial</h3>
          </Card>

          <Card 
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              embedType === "text" ? "border-primary bg-primary/5" : "hover:border-primary/50"
            }`}
            onClick={() => setEmbedType("text")}
          >
            <div className="aspect-video bg-card rounded-lg mb-4 p-4 border-2 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={alexMacgregor} />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">Kim Ling</p>
                  <p className="text-xs text-muted-foreground">Co-Founder</p>
                </div>
              </div>
              <div className="flex-1 flex items-start">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "We embedded Testimonial.to on the last page of our forms and candidates' testimonials started coming in automatically!"
                </p>
              </div>
            </div>
            <h3 className="font-semibold text-center">Text testimonial</h3>
          </Card>
        </div>

        {/* Embed Code */}
        <Card className="p-8 rounded-2xl border-2">
          <h2 className="font-semibold text-xl mb-4">Embed Code</h2>
          <p className="text-muted-foreground mb-4">
            Copy and paste this code into your website where you want the testimonial to appear.
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
        </Card>
      </div>
    </div>
  );
};

export default SingleTestimonial;
