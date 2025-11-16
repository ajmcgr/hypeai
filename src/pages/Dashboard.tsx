import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Sparkles, CreditCard, Search, Plus, MoreVertical, Layers, Key, Copy, Lock, AlertTriangle, LayoutDashboard, TrendingUp, Settings, Gift, Award, Chrome, LogOut, ThumbsUp, Link2, Trash2, Files, ExternalLink, Instagram, Facebook, Youtube, MessageSquare, Mail, Heart, Star } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [isEditSpaceOpen, setIsEditSpaceOpen] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [collectStarRatings, setCollectStarRatings] = useState(true);
  const [reviewPages, setReviewPages] = useState<any[]>([]);
  const [newLogoDataUrl, setNewLogoDataUrl] = useState<string>("");
  const [editedLogoDataUrl, setEditedLogoDataUrl] = useState<string>("");
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  
  // Edit space states
  const [editedSpaceName, setEditedSpaceName] = useState("Test");
  const [editedHeaderTitle, setEditedHeaderTitle] = useState("Would you like to give a shoutout for our product?");
  const [editedCustomMessage, setEditedCustomMessage] = useState("We'd love to hear your feedback!");
  const [editedCollectStarRatings, setEditedCollectStarRatings] = useState(true);
  const [editedButtonColor, setEditedButtonColor] = useState("#5D5DFF");
  const [editedBackgroundColor, setEditedBackgroundColor] = useState("#ffffff");
  const [editedFontColor, setEditedFontColor] = useState("#000000");
  const [editedDisplayType, setEditedDisplayType] = useState("text-video");
  const [editedDisplayStyle, setEditedDisplayStyle] = useState("list");

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/login");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const loadReviewPages = () => {
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      setReviewPages(pages);
    };
    
    loadReviewPages();
    
    // Listen for storage changes
    window.addEventListener('storage', loadReviewPages);
    
    // Custom event for same-window updates
    window.addEventListener('reviewPagesUpdated', loadReviewPages);
    
    return () => {
      window.removeEventListener('storage', loadReviewPages);
      window.removeEventListener('reviewPagesUpdated', loadReviewPages);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/login");
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={hypeLogo} alt="Hype" className="h-8" />
          </div>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarFallback className="bg-foreground text-background">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer py-3">
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  Dashboard
                </DropdownMenuItem>
                
                <Link to="/pricing">
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <TrendingUp className="w-4 h-4 mr-3" />
                    Upgrade
                  </DropdownMenuItem>
                </Link>
                
                <Link to="/settings">
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer py-3" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Overview Section */}
        <h1 className="font-reckless text-4xl font-medium mb-8">Overview</h1>

        {/* Import Reviews Section */}
        <div className="mb-16">
          <h2 className="font-reckless text-3xl font-medium mb-6">Import Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Social Media */}
            <Link to="/social-media">
              <Card className="p-6 rounded-2xl border-2 hover:shadow-md transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-google-blue/10 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-google-blue" />
                  </div>
                  <div>
                    <h3 className="font-reckless text-xl font-medium mb-1">Social Media</h3>
                    <p className="text-sm text-muted-foreground">Import from X, LinkedIn, TikTok, Instagram, YouTube</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Other Testimonials */}
            <Link to="/other-reviews">
              <Card className="p-6 rounded-2xl border-2 hover:shadow-md transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-google-yellow/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-google-yellow" />
                  </div>
                  <div>
                    <h3 className="font-reckless text-xl font-medium mb-1">Other Reviews</h3>
                    <p className="text-sm text-muted-foreground">Import from Google, Yelp, G2, AppSumo, Amazon</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Forms */}
            <Link to="/forms">
              <Card className="p-6 rounded-2xl border-2 hover:shadow-md transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-reckless text-xl font-medium mb-1">Forms</h3>
                    <p className="text-sm text-muted-foreground">
                      Create custom forms to collect reviews
                      {(() => {
                        const forms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
                        return forms.length > 0 ? ` (${forms.length})` : '';
                      })()}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Share & Track Reviews Section */}
        <div className="mb-16">
          <h2 className="font-reckless text-3xl font-medium mb-6">Share & Track Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Manage Reviews */}
            <Link to="/manage-reviews">
              <Card className="p-6 rounded-2xl border-2 hover:shadow-md transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-google-red/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-google-red" />
                  </div>
                  <div>
                    <h3 className="font-reckless text-xl font-medium mb-1">Share Reviews</h3>
                    <p className="text-sm text-muted-foreground">View your public reviews and Wall of Love pages</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Analytics */}
            <Link to="/analytics">
              <Card className="p-6 rounded-2xl border-2 hover:shadow-md transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-google-green/10 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-google-green" />
                  </div>
                  <div>
                    <h3 className="font-reckless text-xl font-medium mb-1">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Track performance of your reviews pages</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-reckless text-3xl font-medium">Reviews</h2>
          <Button className="rounded-xl gap-2" onClick={() => setIsCreateSpaceOpen(true)}>
            <Plus className="w-4 h-4" />
            Create a new reviews page
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search reviews by name, email, or keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 rounded-xl text-base"
          />
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviewPages.length === 0 ? (
            <Card className="p-6 rounded-2xl border-2 col-span-3 text-center">
              <p className="text-muted-foreground">No reviews pages yet. Create your first one to get started!</p>
            </Card>
          ) : (
            reviewPages.map((page) => (
              <Card key={page.id} className="p-6 rounded-2xl border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {page.logo ? (
                      <img src={page.logo} alt={`${page.name} logo`} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-muted text-foreground">
                          {page.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span className="font-semibold text-lg">{page.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/reviews/approve`}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg"
                      >
                        Manage
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-card z-50">
                        <DropdownMenuItem 
                          className="cursor-pointer py-3"
                          onClick={() => {
                            setEditedSpaceName(page.name);
                            setEditedHeaderTitle(page.headerTitle || "");
                            setEditedCustomMessage(page.customMessage || "");
                            setEditedCollectStarRatings(page.collectStarRatings ?? true);
                            setEditedLogoDataUrl(page.logo || "");
                            setEditedButtonColor(page.buttonColor || "#5D5DFF");
                            setEditedBackgroundColor(page.backgroundColor || "#ffffff");
                            setEditedFontColor(page.fontColor || "#000000");
                            setEditedDisplayType(page.displayType || "text-video");
                            setEditedDisplayStyle(page.displayStyle || "list");
                            setEditingPageId(page.id);
                            setIsEditSpaceOpen(true);
                          }}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Edit page
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer py-3 text-destructive focus:text-destructive"
                          onClick={() => {
                            const confirmed = window.confirm(`Are you sure you want to delete "${page.name}"?`);
                            if (confirmed) {
                              const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
                              const updated = pages.filter((p: any) => p.id !== page.id);
                              localStorage.setItem('hype_review_pages', JSON.stringify(updated));
                              window.dispatchEvent(new Event('reviewPagesUpdated'));
                              toast({
                                title: "Deleted",
                                description: `Review page "${page.name}" has been deleted`,
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-3" />
                          Delete page
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Videos: <span className="font-medium">{(() => {
                    const reviews = JSON.parse(localStorage.getItem(`hype_reviews_${page.slug}`) || '[]');
                    return reviews.filter((r: any) => r.type === 'video').length;
                  })()}</span></span>
                  <span>Text: <span className="font-medium">{(() => {
                    const reviews = JSON.parse(localStorage.getItem(`hype_reviews_${page.slug}`) || '[]');
                    return reviews.filter((r: any) => r.type === 'text' || !r.type).length;
                  })()}</span></span>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Create Space Modal */}
        <Dialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">Create a new Review Page</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                After the page is created, it will generate a dedicated page for collecting reviews.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Space name */}
              <div className="space-y-2">
                <Label htmlFor="spaceName">
                  Review page name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="spaceName"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  className="rounded-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Public URL is: testimonial.to/your-space
                </p>
              </div>

              {/* Space logo */}
              <div className="space-y-2">
                <Label htmlFor="logo-upload">
                  Logo <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                    <ThumbsUp className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setNewLogoDataUrl(reader.result as string);
                          toast({
                            title: "Logo uploaded",
                            description: `${file.name} has been uploaded successfully.`,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    Change
                  </Button>
                </div>
              </div>

              {/* Header title */}
              <div className="space-y-2">
                <Label htmlFor="headerTitle">
                  Header title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="headerTitle"
                  placeholder="Would you like to give a shoutout for xyz?"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              {/* Custom message */}
              <div className="space-y-2">
                <Label htmlFor="customMessage">
                  Your custom message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="customMessage"
                  placeholder="Write a warm message to your customers, and give them simple directions on how to make the best review."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="rounded-lg min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">Markdown supported</p>
              </div>

              {/* Collect extra information */}
              <div className="space-y-2">
                <Label>Collect extra information</Label>
                <Select defaultValue="name-email">
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-email">Name, email, title, social link, etc.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Collection settings */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Display review type</Label>
                  <Select defaultValue="text-video">
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="text-video">Text and Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Display star ratings</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={collectStarRatings}
                      onCheckedChange={setCollectStarRatings}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    defaultValue="#ffffff"
                    className="w-20 h-10 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Font Color</Label>
                  <Input
                    type="color"
                    defaultValue="#000000"
                    className="w-20 h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Custom button color */}
              <div className="space-y-2">
                <Label>Custom button color 🎨</Label>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-10 h-10 rounded bg-orange-500 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-yellow-400 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-green-500 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-emerald-500 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-cyan-400 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-blue-500 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-gray-400 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-pink-500 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-purple-400 cursor-pointer" />
                  <div className="w-10 h-10 rounded bg-indigo-600 cursor-pointer" />
                  <div className="w-10 h-10 rounded border-2 border-border cursor-pointer" />
                  <Input type="text" placeholder="#5D5DFF" className="w-24 h-10 rounded" />
                </div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="dutch">Dutch</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Auto translate */}
              <div className="space-y-2">
                <Label>Auto translate to other languages? 🔒</Label>
                <Select>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Create button */}
              <Button 
                className="w-full rounded-lg py-6 text-base" 
                size="lg"
                onClick={() => {
                  if (!spaceName.trim()) {
                    toast({
                      title: "Error",
                      description: "Please enter a review page name",
                      variant: "destructive",
                    });
                    return;
                  }

                  // Enforce plan limits
                  const existingPages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
                  const currentPlan = "Free"; // TODO: Get from user profile
                  const planLimits: any = {
                    Free: { reviewPages: 1, textReviews: 2, videoReviews: 2 },
                    Pro: { reviewPages: 5, textReviews: Infinity, videoReviews: 2 },
                    Business: { reviewPages: 20, textReviews: Infinity, videoReviews: Infinity }
                  };

                  if (existingPages.length >= planLimits[currentPlan].reviewPages) {
                    toast({
                      title: "Plan Limit Reached",
                      description: `Your ${currentPlan} plan allows ${planLimits[currentPlan].reviewPages} review page(s). Upgrade to create more.`,
                      variant: "destructive",
                    });
                    return;
                  }

                  const reviewPage = {
                    id: Date.now().toString(),
                    name: spaceName,
                    slug: spaceName.toLowerCase().replace(/\s+/g, '-'),
                    headerTitle,
                    customMessage,
                    collectStarRatings,
                    logo: newLogoDataUrl || "",
                    createdAt: new Date().toISOString(),
                  };

                  localStorage.setItem('hype_review_pages', JSON.stringify([...existingPages, reviewPage]));

                  // Dispatch custom event for same-window updates
                  window.dispatchEvent(new Event('reviewPagesUpdated'));

                  toast({
                    title: "Success",
                    description: `Review page "${spaceName}" created successfully`,
                  });

                  setIsCreateSpaceOpen(false);
                  setSpaceName("");
                  setHeaderTitle("");
                  setCustomMessage("");
                  setNewLogoDataUrl("");
                }}
              >
                Create new Review Page
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Space Modal */}
        <Dialog open={isEditSpaceOpen} onOpenChange={setIsEditSpaceOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">Edit Review Page</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Update your review page settings and review collection preferences.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Space name */}
              <div className="space-y-2">
                <Label htmlFor="editSpaceName">
                  Review page name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="editSpaceName"
                  value={editedSpaceName}
                  onChange={(e) => setEditedSpaceName(e.target.value)}
                  className="rounded-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Public URL is: testimonial.to/{editedSpaceName.toLowerCase().replace(/\s+/g, '-')}
                </p>
              </div>

              {/* Space logo */}
              <div className="space-y-2">
                <Label htmlFor="edit-logo-upload">
                  Logo <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  {editedLogoDataUrl ? (
                    <img 
                      src={editedLogoDataUrl} 
                      alt="Logo preview" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                      <ThumbsUp className="w-8 h-8 text-primary-foreground" />
                    </div>
                  )}
                  <input
                    id="edit-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditedLogoDataUrl(reader.result as string);
                          toast({
                            title: "Logo updated",
                            description: `${file.name} has been uploaded successfully.`,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('edit-logo-upload')?.click()}
                  >
                    Change
                  </Button>
                </div>
              </div>

              {/* Header title */}
              <div className="space-y-2">
                <Label htmlFor="editHeaderTitle">
                  Header title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="editHeaderTitle"
                  placeholder="Would you like to give a shoutout for xyz?"
                  value={editedHeaderTitle}
                  onChange={(e) => setEditedHeaderTitle(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              {/* Custom message */}
              <div className="space-y-2">
                <Label htmlFor="editCustomMessage">
                  Your custom message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="editCustomMessage"
                  placeholder="Write a warm message to your customers, and give them simple directions on how to make the best review."
                  value={editedCustomMessage}
                  onChange={(e) => setEditedCustomMessage(e.target.value)}
                  className="rounded-lg min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">Markdown supported</p>
              </div>

              {/* Collect extra information */}
              <div className="space-y-2">
                <Label>Collect extra information</Label>
                <Select defaultValue="name-email">
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-email">Name & Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Settings Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display review type</Label>
                  <Select value={editedDisplayType} onValueChange={setEditedDisplayType}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="text-video">Text and Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Display Style</Label>
                  <Select value={editedDisplayStyle} onValueChange={setEditedDisplayStyle}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="wall">Wall of Love</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Display star ratings</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={editedCollectStarRatings}
                      onCheckedChange={setEditedCollectStarRatings}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={editedBackgroundColor}
                    onChange={(e) => setEditedBackgroundColor(e.target.value)}
                    className="w-20 h-10 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Font Color</Label>
                  <Input
                    type="color"
                    value={editedFontColor}
                    onChange={(e) => setEditedFontColor(e.target.value)}
                    className="w-20 h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Custom button color */}
              <div className="space-y-2">
                <Label>Custom button color 🎨</Label>
                <div className="flex gap-2 flex-wrap">
                  <div 
                    className="w-10 h-10 rounded bg-orange-500 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#f97316")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-yellow-400 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#facc15")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-green-500 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#22c55e")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-emerald-500 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#10b981")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-cyan-400 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#22d3ee")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-blue-500 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#3b82f6")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-gray-400 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#9ca3af")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-pink-500 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#ec4899")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-purple-400 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#c084fc")}
                  />
                  <div 
                    className="w-10 h-10 rounded bg-indigo-600 cursor-pointer hover:scale-110 transition-transform" 
                    onClick={() => setEditedButtonColor("#4f46e5")}
                  />
                  <div 
                    className="w-10 h-10 rounded border-2 border-border cursor-pointer hover:scale-110 transition-transform bg-white" 
                    onClick={() => setEditedButtonColor("#ffffff")}
                  />
                  <Input 
                    type="text" 
                    placeholder="#5D5DFF" 
                    value={editedButtonColor}
                    onChange={(e) => setEditedButtonColor(e.target.value)}
                    className="w-24 h-10 rounded" 
                  />
                </div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="dutch">Dutch</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Save button */}
              <Button 
                className="w-full rounded-lg py-6 text-base" 
                size="lg"
                onClick={() => {
                  if (!editingPageId) {
                    setIsEditSpaceOpen(false);
                    return;
                  }
                  const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
                  const updated = pages.map((p: any) =>
                    p.id === editingPageId
                      ? {
                          ...p,
                          name: editedSpaceName,
                          headerTitle: editedHeaderTitle,
                          customMessage: editedCustomMessage,
                          collectStarRatings: editedCollectStarRatings,
                          logo: editedLogoDataUrl || p.logo || "",
                          buttonColor: editedButtonColor,
                          backgroundColor: editedBackgroundColor,
                          fontColor: editedFontColor,
                          displayType: editedDisplayType,
                          displayStyle: editedDisplayStyle,
                        }
                      : p
                  );
                  localStorage.setItem('hype_review_pages', JSON.stringify(updated));
                  window.dispatchEvent(new Event('reviewPagesUpdated'));
                  toast({
                    title: "Success",
                    description: "Review page settings updated successfully",
                  });
                  setIsEditSpaceOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;
