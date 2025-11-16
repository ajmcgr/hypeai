import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Twitter, Linkedin, Instagram, Youtube, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import hypeLogo from "@/assets/hype-logo.png";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SocialMediaImports = () => {
  const navigate = useNavigate();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [selectedReviewsPage, setSelectedReviewsPage] = useState("");

  const platforms = [
    { name: "Twitter", icon: Twitter, color: "google-blue" },
    { name: "LinkedIn", icon: Linkedin, color: "google-blue" },
    { name: "TikTok", icon: Video, color: "google-yellow" },
    { name: "Instagram", icon: Instagram, color: "google-red" },
    { name: "YouTube", icon: Youtube, color: "google-red" },
  ];

  const handleImport = (platformName: string) => {
    setSelectedPlatform(platformName);
    setIsImportDialogOpen(true);
  };

  const handleSubmitImport = () => {
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

    toast({
      title: "Import Started",
      description: `Importing from ${selectedPlatform} to ${selectedReviewsPage}...`,
    });
    setIsImportDialogOpen(false);
    setPostUrl("");
    setSelectedReviewsPage("");
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
          <h1 className="font-reckless text-4xl font-medium mb-4">Import from Social Media</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Select a platform to import your social media posts as reviews
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
                <SelectContent>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="public-reviews">Public Reviews</SelectItem>
                  <SelectItem value="wall-of-love">Wall of Love</SelectItem>
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
