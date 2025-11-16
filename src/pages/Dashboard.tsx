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
  
  // Edit space states
  const [editedSpaceName, setEditedSpaceName] = useState("Test");
  const [editedHeaderTitle, setEditedHeaderTitle] = useState("Would you like to give a shoutout for our product?");
  const [editedCustomMessage, setEditedCustomMessage] = useState("We'd love to hear your feedback!");
  const [editedCollectStarRatings, setEditedCollectStarRatings] = useState(true);

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
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Total Videos Card */}
          <Card className="p-6 rounded-2xl border-2 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-muted-foreground">Total Videos</span>
              <Video className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-4xl font-bold">
              <span className="text-foreground">0</span>
              <span className="text-muted-foreground">/2</span>
            </div>
          </Card>

          {/* Total Reviews Card */}
          <Card className="p-6 rounded-2xl border-2 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-muted-foreground">Total Reviews</span>
              <Sparkles className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-4xl font-bold text-foreground">1</div>
          </Card>

          {/* Current Plan Card */}
          <Card className="p-6 rounded-2xl border-2 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-muted-foreground">Current Plan</span>
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">Starter</span>
              <Link to="/pricing">
                <Button variant="outline" size="sm" className="rounded-lg">
                  ✨ Upgrade
                </Button>
              </Link>
            </div>
          </Card>
        </div>

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
                    <p className="text-sm text-muted-foreground">Import from Twitter, LinkedIn, TikTok, Instagram, YouTube</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Other Reviews */}
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
                    <p className="text-sm text-muted-foreground">Create custom forms to collect reviews</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Analyze Reviews Section */}
        <div className="mb-16">
          <h2 className="font-reckless text-3xl font-medium mb-6">Analyze Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Manage Reviews */}
            <Link to="/reviews-pages">
              <Card className="p-6 rounded-2xl border-2 hover:shadow-md transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-xl bg-google-red/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-google-red" />
                  </div>
                  <div>
                    <h3 className="font-reckless text-xl font-medium mb-1">Manage Reviews</h3>
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
          <h2 className="font-reckless text-3xl font-medium">Reviews Pages</h2>
          <Button className="rounded-xl gap-2" onClick={() => setIsCreateSpaceOpen(true)}>
            <Plus className="w-4 h-4" />
            Create a new review page
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
          <Card className="p-6 rounded-2xl border-2 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-muted text-foreground">
                    T
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-lg">Test</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg"
                  onClick={() => navigate("/testimonials/test")}
                >
                  Reviews
                </Button>
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
                        setEditedSpaceName("Test");
                        setEditedHeaderTitle("Would you like to give a shoutout for our product?");
                        setEditedCustomMessage("We'd love to hear your feedback!");
                        setEditedCollectStarRatings(true);
                        setIsEditSpaceOpen(true);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Edit Settings
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="cursor-pointer py-3"
                      onClick={() => navigate("/testimonials/test")}
                    >
                      <Layers className="w-4 h-4 mr-3" />
                      Manage Reviews
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="cursor-pointer py-3"
                      onClick={() => window.open(`/reviews/test`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-3" />
                      View Public Page
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="cursor-pointer py-3"
                      onClick={() => {
                        toast({
                          title: "Review Page Duplicated",
                          description: "A copy of this review page has been created",
                        });
                      }}
                    >
                      <Files className="w-4 h-4 mr-3" />
                      Duplicate Review Page
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      className="cursor-pointer py-3 text-destructive focus:text-destructive"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this review page? This action cannot be undone.")) {
                          toast({
                            title: "Review Page Deleted",
                            description: "The review page has been permanently deleted",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete Review Page
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Videos: <span className="font-medium">0</span></span>
              <span>Text: <span className="font-medium">0</span></span>
            </div>
          </Card>
        </div>

        {/* Create Space Modal */}
        <Dialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">Create a new Review Page</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                After the page is created, it will generate a dedicated page for collecting testimonials.
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
                <Label>
                  Logo <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                    <ThumbsUp className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="square" />
                    <Label htmlFor="square" className="text-sm font-normal">square?</Label>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
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
                  placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
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
                  <Label>Collection type</Label>
                  <Select defaultValue="text-video">
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-video">Text and video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Collect star ratings</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={collectStarRatings}
                      onCheckedChange={setCollectStarRatings}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Choose a theme</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 cursor-pointer" />
                  </div>
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
              <Button className="w-full rounded-lg py-6 text-base" size="lg">
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
                Update your review page settings and testimonial collection preferences.
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
                <Label>
                  Logo <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                    <ThumbsUp className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
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
                  placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
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

              {/* Questions */}
              <div className="space-y-2">
                <Label>Questions</Label>
                <div className="space-y-2">
                  <Input placeholder="Who are you / what are you working on?" className="rounded-lg" />
                  <Input placeholder="How has [our product / service] helped you?" className="rounded-lg" />
                  <Input placeholder="What is the best thing about [our product / service]" className="rounded-lg" />
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add one (upto 5)
                  </Button>
                </div>
              </div>

              {/* Settings Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Collection type</Label>
                  <Select defaultValue="text-video">
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-video">Text and video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Collect star ratings</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={editedCollectStarRatings}
                      onCheckedChange={setEditedCollectStarRatings}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Choose a theme</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 cursor-pointer" />
                  </div>
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
                  </SelectContent>
                </Select>
              </div>

              {/* Save button */}
              <Button 
                className="w-full rounded-lg py-6 text-base" 
                size="lg"
                onClick={() => {
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
