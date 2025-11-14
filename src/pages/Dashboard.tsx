import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Sparkles, CreditCard, Search, Plus, MoreVertical } from "lucide-react";
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleLogout}
            >
              <Avatar>
                <AvatarFallback className="bg-foreground text-background">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
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
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
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
