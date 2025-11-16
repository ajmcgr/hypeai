import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Video as VideoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormDisplay = () => {
  const { formId } = useParams();
  const { toast } = useToast();
  const [form, setForm] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testimonial, setTestimonial] = useState("");

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
    const foundForm = forms.find((f: any) => f.id === formId);
    
    if (foundForm) {
      setForm(foundForm);
      
      // Load page data
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      const page = pages.find((p: any) => p.slug === foundForm.reviewsPage);
      setPageData(page);
    }
  }, [formId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the page slug from the form's reviewsPage
    const storageKey = `hype_reviews_${form.reviewsPage}`;
    const testimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newTestimonial = {
      id: Date.now().toString(),
      spaceName: form.reviewsPage,
      author: name,
      email,
      content: testimonial,
      rating,
      type: 'text',
      source: 'form',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    testimonials.push(newTestimonial);
    localStorage.setItem(storageKey, JSON.stringify(testimonials));
    
    toast({
      title: "Thank you!",
      description: "Your testimonial has been submitted and is pending approval.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setTestimonial("");
    setRating(0);
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Form Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This form does not exist or has been deleted.
          </p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-8 text-center">
          {pageData?.logo && (
            <img 
              src={pageData.logo} 
              alt={form.name}
              className="h-16 mx-auto mb-4"
            />
          )}
          <h1 className="font-reckless text-3xl font-medium mb-2">
            {form.headerTitle || form.name}
          </h1>
          {form.customMessage && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {form.customMessage}
            </p>
          )}
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <Card className="p-8 rounded-2xl border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Option */}
            {form.collectVideo && (
              <div className="p-6 border-2 border-dashed rounded-xl text-center">
                <VideoIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-2">Record a Video Testimonial</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your experience in a video message
                </p>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Video recording functionality will be available soon. For now, please use the text testimonial option.",
                    });
                  }}
                >
                  Record Video
                </Button>
              </div>
            )}

            {/* Star Rating */}
            {form.collectStars && (
              <div className="space-y-2">
                <Label>Rating *</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Fields */}
            {form.collectText && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial">Your Testimonial *</Label>
                  <Textarea
                    id="testimonial"
                    value={testimonial}
                    onChange={(e) => setTestimonial(e.target.value)}
                    required
                    placeholder="Share your experience..."
                    rows={6}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg">
              Submit Testimonial
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default FormDisplay;
