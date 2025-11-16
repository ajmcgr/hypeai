import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Star, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const OtherReviewsImports = () => {
  const navigate = useNavigate();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [testimonialUrl, setTestimonialUrl] = useState("");
  const [selectedTestimonialPage, setSelectedTestimonialPage] = useState("");
  const [testimonialPages, setTestimonialPages] = useState<any[]>([]);

  useEffect(() => {
    const loadTestimonialPages = () => {
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      setTestimonialPages(pages);
    };
    
    loadTestimonialPages();
    
    // Listen for storage changes
    window.addEventListener('storage', loadTestimonialPages);
    window.addEventListener('reviewPagesUpdated', loadTestimonialPages);
    window.addEventListener('testimonialPagesUpdated', loadTestimonialPages);
    
    return () => {
      window.removeEventListener('storage', loadTestimonialPages);
      window.removeEventListener('reviewPagesUpdated', loadTestimonialPages);
      window.removeEventListener('testimonialPagesUpdated', loadTestimonialPages);
    };
  }, []);

  const platforms = [
    { name: "Google", icon: Star, color: "google-blue" },
    { name: "Yelp", icon: Star, color: "google-red" },
    { name: "G2", icon: Award, color: "google-yellow" },
    { name: "AppSumo", icon: Award, color: "google-green" },
    { name: "Amazon", icon: Star, color: "google-yellow" },
    { name: "Capterra", icon: Award, color: "google-blue" },
    { name: "Product Hunt", icon: Award, color: "google-red" },
  ];

  const handleImport = (platformName: string) => {
    setSelectedPlatform(platformName);
    setIsImportDialogOpen(true);
  };

  const handleImportSubmit = () => {
    if (!selectedTestimonialPage) {
      toast({
        title: "Error",
        description: "Please select a testimonial page",
        variant: "destructive",
      });
      return;
    }

    // Get current plan and limits
    const currentPlan = 'Free'; // This would come from the user's subscription
    const planLimits: any = {
      Free: { textTestimonials: 2 },
      Pro: { textTestimonials: Infinity },
      Business: { textTestimonials: Infinity }
    };

    // Count existing text testimonials
    const existingTestimonials = JSON.parse(localStorage.getItem(`hype_reviews_${selectedTestimonialPage}`) || '[]');
    const textTestimonialCount = existingTestimonials.filter((t: any) => t.type === 'text' || !t.type).length;

    // Check if limit is reached
    if (textTestimonialCount >= planLimits[currentPlan].textTestimonials) {
      toast({
        title: "Limit Reached",
        description: `You've reached the limit of ${planLimits[currentPlan].textTestimonials} text testimonials on the ${currentPlan} plan. Upgrade to import more.`,
        variant: "destructive",
      });
      return;
    }

    // Simulate testimonial import
    const newTestimonial = {
      id: Date.now().toString(),
      author: "Customer Name",
      content: `Testimonial imported from ${selectedPlatform}. Full content would be fetched from the platform's API or embed.`,
      rating: 5,
      source: selectedPlatform,
      url: testimonialUrl,
      type: 'text',
      status: 'pending'
    };

    // Save to localStorage
    const storageKey = `hype_reviews_${selectedTestimonialPage}`;
    const currentTestimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
    localStorage.setItem(storageKey, JSON.stringify([...currentTestimonials, newTestimonial]));

    toast({
      title: "Testimonial Imported",
      description: `Successfully imported testimonial from ${selectedPlatform}`,
    });

    setIsImportDialogOpen(false);
    setTestimonialUrl("");
    setSelectedPlatform("");
    setSelectedTestimonialPage("");
  };

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
          <h1 className="font-reckless text-4xl font-medium mb-4">Import from Review Sites</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Select a platform to import reviews from various review sites
          </p>

          <div className="space-y-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Card
                  key={platform.name}
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2"
                  onClick={() => handleImport(platform.name)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-${platform.color}/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${platform.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-reckless text-xl font-medium">{platform.name}</h3>
                    </div>
                    <Download className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import from {selectedPlatform}</DialogTitle>
            <DialogDescription>
              Enter the URL of the review and select which reviews page to import to
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="reviews-page">Testimonials Page *</Label>
              <Select value={selectedTestimonialPage} onValueChange={setSelectedTestimonialPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a testimonials page" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  {testimonialPages.length === 0 ? (
                    <SelectItem value="none" disabled>No testimonial pages created yet</SelectItem>
                  ) : (
                    testimonialPages.map((page) => (
                      <SelectItem key={page.id} value={page.slug}>
                        {page.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialUrl">Testimonial URL *</Label>
              <Input
                id="testimonialUrl"
                placeholder={`https://${selectedPlatform.toLowerCase()}.com/...`}
                value={testimonialUrl}
                onChange={(e) => setTestimonialUrl(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleImportSubmit} className="flex-1">
                Import
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsImportDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OtherReviewsImports;
