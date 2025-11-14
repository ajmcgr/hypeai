import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Sparkles, CreditCard, Search, Plus, MoreVertical, Layers, Key, Copy, Lock, AlertTriangle, LayoutDashboard, TrendingUp, Settings, Gift, Award, Chrome, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-reckless text-xl font-medium">Testimonial</span>
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

          {/* Total Spaces Card */}
          <Card className="p-6 rounded-2xl border-2 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-muted-foreground">Total Spaces</span>
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

        {/* Spaces Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-reckless text-3xl font-medium">Spaces</h2>
          <Button className="rounded-xl gap-2">
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

        {/* Spaces Grid */}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-[#3a3a3a] border-[#3a3a3a]">
                  <DropdownMenuItem className="text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] focus:text-white cursor-pointer py-3">
                    <Layers className="w-4 h-4 mr-3" />
                    Manage testimonials
                  </DropdownMenuItem>
                  
                  <div className="px-2 py-3 text-sm text-white/90 bg-[#2a2a2a] mx-2 my-2 rounded">
                    You need to upgrade to the Premium plan or above to gain access.
                  </div>
                  
                  <DropdownMenuItem className="text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] focus:text-white cursor-pointer py-3">
                    <Key className="w-4 h-4 mr-3" />
                    API Key
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] focus:text-white cursor-pointer py-3">
                    <Copy className="w-4 h-4 mr-3" />
                    Duplicate the space
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] focus:text-white cursor-pointer py-3">
                    <Lock className="w-4 h-4 mr-3" />
                    Disable the space
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] focus:text-white cursor-pointer py-3">
                    <AlertTriangle className="w-4 h-4 mr-3" />
                    Delete the space
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Videos: <span className="font-medium">0</span></span>
              <span>Text: <span className="font-medium">0</span></span>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
