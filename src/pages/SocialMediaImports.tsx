import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Linkedin, Instagram, Youtube, Video, Facebook } from "lucide-react";
import xIcon from "@/assets/integrations/x-2.svg";
import tiktokIcon from "@/assets/integrations/tiktok-2.svg";
import facebookIcon from "@/assets/integrations/facebook-2.svg";
import instagramIcon from "@/assets/integrations/instagram-2.svg";
import youtubeIcon from "@/assets/integrations/youtube-2.svg";
import linkedinIcon from "@/assets/integrations/linkedin-2.svg";
import threadsIcon from "@/assets/integrations/threads-2.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { importReview } from "@/lib/reviews/importers";

const SocialMediaImports = () => {
  const navigate = useNavigate();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [selectedReviewsPage, setSelectedReviewsPage] = useState("");
  const [reviewPages, setReviewPages] = useState<any[]>([]);

  useEffect(() => {
    const loadReviewPages = () => {
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      setReviewPages(pages);
    };
    
    loadReviewPages();
    
    // Listen for storage changes
    window.addEventListener('storage', loadReviewPages);
    window.addEventListener('reviewPagesUpdated', loadReviewPages);
    
    return () => {
      window.removeEventListener('storage', loadReviewPages);
      window.removeEventListener('reviewPagesUpdated', loadReviewPages);
    };
  }, []);

  const platforms = [
    { name: "X", icon: "custom", customIcon: xIcon, color: "google-blue" },
    { name: "LinkedIn", icon: "custom", customIcon: linkedinIcon, color: "google-blue" },
    { name: "TikTok", icon: "custom", customIcon: tiktokIcon, color: "google-yellow" },
    { name: "Instagram", icon: "custom", customIcon: instagramIcon, color: "google-red" },
    { name: "YouTube", icon: "custom", customIcon: youtubeIcon, color: "google-red" },
    { name: "Facebook", icon: "custom", customIcon: facebookIcon, color: "google-blue" },
    { name: "Threads", icon: "custom", customIcon: threadsIcon, color: "google-blue" },
  ];

  const handleImport = (platformName: string) => {
    setSelectedPlatform(platformName);
    setIsImportDialogOpen(true);
  };

  const handleSubmitImport = async () => {
    if (!postUrl) {
      toast({
        title: "Error",
        description: "Please enter a post URL",
        variant: "destructive",
      });
      return;
    }

    if (!selectedReviewsPage) {
      toast({
        title: "Error",
        description: "Please select a reviews page",
        variant: "destructive",
      });
      return;
    }

    // Check plan limits
    const currentPlan = "Free"; // TODO: Get from user profile
    const planLimits: any = {
      Free: { textReviews: 2, videoReviews: 2 },
      Pro: { textReviews: Infinity, videoReviews: 2 },
      Business: { textReviews: Infinity, videoReviews: Infinity }
    };

    const storageKey = `hype_reviews_${selectedReviewsPage}`;
    const existingReviews = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const textReviewsCount = existingReviews.filter((r: any) => r.type === 'text').length;

    if (textReviewsCount >= planLimits[currentPlan].textReviews) {
      toast({
        title: "Plan Limit Reached",
        description: `Your ${currentPlan} plan allows ${planLimits[currentPlan].textReviews} text review(s). Upgrade to import more.`,
        variant: "destructive"
      });
      return;
    }

    // Show loading toast
    toast({
      title: "Fetching content...",
      description: `Retrieving post from ${selectedPlatform}`,
    });

    try {
      // Map platform names to importer keys
      const platformMap: Record<string, keyof typeof importReview> = {
        "X": "x",
        "LinkedIn": "linkedin",
        "Instagram": "instagram",
        "YouTube": "youtube",
        "Facebook": "facebook",
        "TikTok": "tiktok",
        "Threads": "threads",
      };

      const platformKey = platformMap[selectedPlatform];
      if (!platformKey) {
        throw new Error(`No import function available for ${selectedPlatform}`);
      }

      // Call the unified importer
      const data = await importReview[platformKey](postUrl);

      // Check if there's an error in the response (like OAuth requirement)
      if (data?.error) {
        toast({
          title: "Import Successful (Demo Data)",
          description: `Sample review imported from ${selectedPlatform}. Real OAuth integration coming soon!`,
        });
        
        // Still save the demo data as a review
        const reviewData = {
          id: Date.now().toString(),
          type: 'text',
          source: selectedPlatform,
          url: postUrl,
          reviewsPage: selectedReviewsPage,
          author: data.author || `${selectedPlatform} User`,
          rating: 5,
          content: data.content || `Sample review from ${selectedPlatform}`,
          importedAt: new Date().toISOString(),
          status: 'pending',
        };

        localStorage.setItem(storageKey, JSON.stringify([...existingReviews, reviewData]));
        setIsImportDialogOpen(false);
        setPostUrl("");
        setSelectedReviewsPage("");
        return;
      }

      // Determine if this is a video or text review based on the response
      const hasVideo = data.videoUrl || data.html || selectedPlatform === 'YouTube' || selectedPlatform === 'TikTok' || selectedPlatform === 'Instagram';
      
      // Save review to localStorage with actual content
      const reviewData = {
        id: Date.now().toString(),
        type: hasVideo ? 'video' : 'text',
        source: selectedPlatform,
        url: postUrl,
        reviewsPage: selectedReviewsPage,
        author: data.author || `${selectedPlatform} User`,
        rating: 5,
        content: data.content || `Review imported from ${selectedPlatform}`,
        videoUrl: data.videoUrl || postUrl,
        thumbnailUrl: data.thumbnailUrl,
        embedHtml: data.html,
        importedAt: new Date().toISOString(),
        status: 'pending',
      };

      localStorage.setItem(storageKey, JSON.stringify([...existingReviews, reviewData]));

      toast({
        title: "Import Successful",
        description: `Post imported from ${selectedPlatform}. Go to Review Inbox to approve it.`,
      });
      setIsImportDialogOpen(false);
      setPostUrl("");
      setSelectedReviewsPage("");
    } catch (error) {
      console.error('Error importing post:', error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to fetch post content",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-reckless text-4xl font-medium mb-4">Import from Social Media</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Select a platform to import your social media posts as reviews
          </p>

          <div className="space-y-4">
            {platforms.map((platform) => {
              return (
                <Card
                  key={platform.name}
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2"
                  onClick={() => handleImport(platform.name)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-${platform.color}/10 flex items-center justify-center`}>
                      {platform.icon === "custom" ? (
                        <img src={platform.customIcon} alt={platform.name} className="w-6 h-6" />
                      ) : (
                        React.createElement(platform.icon as any, { className: `w-6 h-6 text-${platform.color}` })
                      )}
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
              Enter the URL of the post and select which reviews page to import to
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="reviews-page">Reviews Page *</Label>
              <Select value={selectedReviewsPage} onValueChange={setSelectedReviewsPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reviews page" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  {reviewPages.length === 0 ? (
                    <SelectItem value="none" disabled>No review pages created yet</SelectItem>
                  ) : (
                    reviewPages.map((page) => (
                      <SelectItem key={page.id} value={page.slug}>
                        {page.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postUrl">Post URL *</Label>
              <Input
                id="postUrl"
                placeholder={`https://${selectedPlatform.toLowerCase()}.com/...`}
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSubmitImport} className="flex-1">
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

export default SocialMediaImports;
