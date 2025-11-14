import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Sparkles, CreditCard, Search, Plus, MoreVertical, Layers, Key, Copy, Lock, AlertTriangle, LayoutDashboard, TrendingUp, Settings, Gift, Award, Chrome, LogOut, ThumbsUp } from "lucide-react";
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
  const [spaceName, setSpaceName] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [collectStarRatings, setCollectStarRatings] = useState(true);

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
    return user.email.substring(0, 2).toUpperCase();
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
                
                <DropdownMenuItem className="cursor-pointer py-3">
                  <TrendingUp className="w-4 h-4 mr-3" />
                  Upgrade
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer py-3">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer py-3">
                  <Gift className="w-4 h-4 mr-3" />
                  Earn 30% referral
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer py-3">
                  <Award className="w-4 h-4 mr-3" />
                  Reward account
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer py-3">
                  <Chrome className="w-4 h-4 mr-3" />
                  Chrome Extension
                </DropdownMenuItem>
                
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
              <Button variant="outline" size="sm" className="rounded-lg">
                ✨ Upgrade
              </Button>
            </div>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-reckless text-3xl font-medium">Reviews Widgets</h2>
          <Button className="rounded-xl gap-2" onClick={() => setIsCreateSpaceOpen(true)}>
            <Plus className="w-4 h-4" />
            Create a new space
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search testimonials by name, email, or keywords"
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
              <Button variant="outline" size="sm" className="rounded-lg">
                Edit
              </Button>
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
              <DialogTitle className="text-2xl font-semibold text-center">Create a new Space</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                After the Space is created, it will generate a dedicated page for collecting testimonials.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Space name */}
              <div className="space-y-2">
                <Label htmlFor="spaceName">
                  Space name <span className="text-destructive">*</span>
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
                  Space logo <span className="text-destructive">*</span>
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
                Create new Space
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;
