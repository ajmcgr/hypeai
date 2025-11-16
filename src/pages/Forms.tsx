import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Video, Star, MessageSquare } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { useState } from "react";

const Forms = () => {
  const [formName, setFormName] = useState("");
  const [headerTitle, setHeaderTitle] = useState("Would you like to give a shoutout for our product?");
  const [customMessage, setCustomMessage] = useState("");
  const [collectStarRatings, setCollectStarRatings] = useState(true);
  const [collectVideo, setCollectVideo] = useState(true);
  const [collectText, setCollectText] = useState(true);
  const [selectedReviewsPage, setSelectedReviewsPage] = useState("");

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
        <div className="max-w-4xl mx-auto">
          <h1 className="font-reckless text-4xl font-medium mb-4">Create Review Collection Form</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Set up a custom form to collect reviews from your customers
          </p>

          {/* Select Reviews Page */}
          <Card className="p-8 rounded-2xl border-2 mb-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="reviews-page" className="text-base font-medium mb-2 block">
                  Select Reviews Page *
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose which reviews page to apply these collected reviews to
                </p>
                <Select value={selectedReviewsPage} onValueChange={setSelectedReviewsPage}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select a reviews page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="main">Main Reviews Page</SelectItem>
                    <SelectItem value="product">Product Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Form Configuration */}
          <Card className="p-8 rounded-2xl border-2 mb-8">
            <h2 className="font-reckless text-2xl font-medium mb-6">Form Settings</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="form-name" className="text-base font-medium mb-2 block">
                  Form Name
                </Label>
                <Input
                  id="form-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="My testimonial form"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="header-title" className="text-base font-medium mb-2 block">
                  Header Title
                </Label>
                <Input
                  id="header-title"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="custom-message" className="text-base font-medium mb-2 block">
                  Custom Message
                </Label>
                <Textarea
                  id="custom-message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Thank you for your feedback! We'd love to hear about your experience..."
                  className="rounded-lg min-h-[100px]"
                />
              </div>
            </div>
          </Card>

          {/* Collection Options */}
          <Card className="p-8 rounded-2xl border-2 mb-8">
            <h2 className="font-reckless text-2xl font-medium mb-6">What to Collect</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Video Testimonials</p>
                    <p className="text-sm text-muted-foreground">Allow customers to record video reviews</p>
                  </div>
                </div>
                <Switch checked={collectVideo} onCheckedChange={setCollectVideo} />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Text Testimonials</p>
                    <p className="text-sm text-muted-foreground">Allow customers to write text reviews</p>
                  </div>
                </div>
                <Switch checked={collectText} onCheckedChange={setCollectText} />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Star Ratings</p>
                    <p className="text-sm text-muted-foreground">Collect 5-star ratings from customers</p>
                  </div>
                </div>
                <Switch checked={collectStarRatings} onCheckedChange={setCollectStarRatings} />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Cancel
              </Button>
            </Link>
            <Button className="flex-1 rounded-lg" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Create Form
            </Button>
          </div>

          {/* Preview Section */}
          <Card className="p-8 rounded-2xl border-2 mt-8 bg-muted/10">
            <h2 className="font-reckless text-2xl font-medium mb-6">Preview</h2>
            <div className="bg-background rounded-xl p-8 border-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-reckless text-2xl font-medium mb-2">
                  {headerTitle || "Would you like to give a shoutout for our product?"}
                </h3>
                {customMessage && (
                  <p className="text-muted-foreground">{customMessage}</p>
                )}
              </div>

              {collectStarRatings && (
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-8 h-8 text-primary fill-primary" />
                  ))}
                </div>
              )}

              {collectVideo && (
                <Button className="w-full mb-4 rounded-lg" size="lg">
                  <Video className="w-4 h-4 mr-2" />
                  Record a video
                </Button>
              )}

              {collectText && (
                <Button variant="outline" className="w-full rounded-lg" size="lg">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write a testimonial
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Forms;
