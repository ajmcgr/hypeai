import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, ArrowLeft, Video, Star } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SingleTestimonial = () => {
  const [copied, setCopied] = useState(false);
  const [searchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string>("");
  const pageSlug = searchParams.get('page');
  
  useEffect(() => {
    if (pageSlug) {
      const storageKey = `hype_reviews_${pageSlug}`;
      const storedTestimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const approvedTestimonials = storedTestimonials.filter((t: any) => t.status === 'approved');
      setTestimonials(approvedTestimonials);
      if (approvedTestimonials.length > 0) {
        setSelectedTestimonialId(approvedTestimonials[0].id);
      }
    }
  }, [pageSlug]);
  
  const selectedTestimonial = testimonials.find(t => t.id === selectedTestimonialId);
  const embedType = selectedTestimonial?.type || 'text';
  
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
          <p className="text-muted-foreground">Select an approved testimonial to embed on your website</p>
        </div>

        {/* Testimonial Selection */}
        {testimonials.length === 0 ? (
          <Card className="p-8 rounded-2xl border-2 text-center mb-8">
            <p className="text-muted-foreground">No approved testimonials yet. Approve some testimonials first!</p>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Select Testimonial</label>
              <Select value={selectedTestimonialId} onValueChange={setSelectedTestimonialId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a testimonial" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  {testimonials.map((testimonial) => (
                    <SelectItem key={testimonial.id} value={testimonial.id}>
                      {testimonial.author} - {testimonial.type === 'video' ? 'Video' : 'Text'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            {selectedTestimonial && (
              <Card className="p-8 mb-8 rounded-2xl border-2">
                <h2 className="font-semibold text-xl mb-4">Preview</h2>
                <Card className="p-6 max-w-2xl mx-auto">
                  {selectedTestimonial.type === 'video' ? (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <Video className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-muted text-foreground">
                        {selectedTestimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{selectedTestimonial.author}</p>
                          <p className="text-sm text-muted-foreground">via {selectedTestimonial.source}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{selectedTestimonial.content}</p>
                    </div>
                  </div>
                </Card>
              </Card>
            )}
          </>
        )}

        {/* Embed Code */}
        {selectedTestimonial && (
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
        )}
      </div>
    </div>
  );
};

export default SingleTestimonial;
