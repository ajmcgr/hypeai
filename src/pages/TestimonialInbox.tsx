import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Video, 
  MessageSquare, 
  Heart, 
  Archive, 
  AlertTriangle,
  Star,
  ChevronDown,
  Edit,
  Award,
  Code,
  Grid3x3,
  Download
} from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TestimonialInbox = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [embedWidgetsExpanded, setEmbedWidgetsExpanded] = useState(true);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [postUrl, setPostUrl] = useState("");

  // Mock testimonial data
  const testimonials = [
    {
      id: 1,
      type: "text",
      rating: 5,
      content: "Cool",
      name: "Alex",
      email: "alex@example.com",
      submittedAt: "Nov 14, 2025, 5:31:05 PM",
      isLiked: true,
    },
  ];

  const filterCounts = {
    all: 1,
    video: 0,
    text: 1,
    liked: 1,
    archived: 0,
    spam: 0,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={hypeLogo} alt="Testimonial" className="h-8" />
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Space Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-muted text-foreground text-xl">
                  T
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-reckless text-3xl font-medium">Test</h1>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="w-4 h-4" />
                  <span>Video credits</span>
                </div>
                <div className="text-2xl font-bold">2</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>Text credits</span>
                </div>
                <div className="text-2xl font-bold">10</div>
              </div>
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit review page
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="space-y-6">
              {/* Inbox Section */}
              <div>
                <h3 className="font-semibold mb-3">Inbox</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === "all"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      All
                    </span>
                    <span className="text-xs">{filterCounts.all}</span>
                  </button>
                  <button
                    onClick={() => setSelectedFilter("video")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === "video"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Video
                    </span>
                    <span className="text-xs">{filterCounts.video}</span>
                  </button>
                  <button
                    onClick={() => setSelectedFilter("text")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === "text"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Text
                    </span>
                    <span className="text-xs">{filterCounts.text}</span>
                  </button>
                  <button
                    onClick={() => setSelectedFilter("liked")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === "liked"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Liked
                    </span>
                    <span className="text-xs">{filterCounts.liked}</span>
                  </button>
                  <button
                    onClick={() => setSelectedFilter("archived")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === "archived"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Archive className="w-4 h-4" />
                      Archived
                    </span>
                    <span className="text-xs">{filterCounts.archived}</span>
                  </button>
                  <button
                    onClick={() => setSelectedFilter("spam")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === "spam"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Spam
                    </span>
                    <span className="text-xs">{filterCounts.spam}</span>
                  </button>
                </div>
              </div>

              {/* Integrations Section */}
              <div className="border-t border-border pt-6 mt-6">
                <div className="px-3 mb-4">
                  <p className="text-sm font-semibold mb-1">Import from</p>
                  <p className="text-xs text-muted-foreground">Select a platform to import your social media posts</p>
                </div>
                <div className="space-y-2 px-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedPlatform("Twitter");
                      setIsImportDialogOpen(true);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedPlatform("LinkedIn");
                      setIsImportDialogOpen(true);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedPlatform("TikTok");
                      setIsImportDialogOpen(true);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    TikTok
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedPlatform("Instagram");
                      setIsImportDialogOpen(true);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Instagram
                  </Button>
                </div>
              </div>

              {/* Embed Widgets Section */}
              <div>
                <button 
                  onClick={() => setEmbedWidgetsExpanded(!embedWidgetsExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  <span>Embed widgets</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${embedWidgetsExpanded ? 'rotate-0' : '-rotate-90'}`} />
                </button>
                {embedWidgetsExpanded && (
                  <div className="space-y-1 mt-1">
                    <Link
                      to="/embeds/wall-of-love"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      <Grid3x3 className="w-4 h-4" />
                      Wall of Love
                    </Link>
                    <Link
                      to="/embeds/single-testimonial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      Single testimonial
                    </Link>
                    <Link
                      to="/embeds/badge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      Badge
                    </Link>
                    <Link
                      to="/embeds/collecting-widget"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Collecting widget
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search reviews by name, email, or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Review tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tones</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All options</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="bulk">Bulk actions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Testimonials List */}
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Text
                        </Badge>
                        {testimonial.isLiked && (
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-lg">{testimonial.content}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Name</span>
                        <p className="text-foreground">{testimonial.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">Submitted At</span>
                        <p className="text-foreground">{testimonial.submittedAt}</p>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="w-full">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import from {selectedPlatform}</DialogTitle>
            <DialogDescription>
              Enter the URL of your {selectedPlatform} post to import it as a testimonial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="postUrl">Post URL</Label>
              <Input
                id="postUrl"
                placeholder={`https://${selectedPlatform.toLowerCase()}.com/...`}
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                if (postUrl) {
                  toast.success(`Importing post from ${selectedPlatform}...`);
                  setIsImportDialogOpen(false);
                  setPostUrl("");
                } else {
                  toast.error("Please enter a valid URL");
                }
              }}
            >
              Import
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialInbox;
