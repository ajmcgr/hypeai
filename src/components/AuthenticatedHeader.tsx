import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, TrendingUp, Settings, LogOut, Zap } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export const AuthenticatedHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadAvatar(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          loadAvatar(session.user.id);
        }
      }
    );

    // Listen for avatar updates
    const handleAvatarUpdate = (event: CustomEvent) => {
      setAvatarUrl(event.detail.avatarUrl);
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate as EventListener);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    };
  }, []);

  const loadAvatar = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single();

      if (data && !error && data.avatar_url) {
        setAvatarUrl(data.avatar_url);
      } else {
        console.log('No avatar found or error:', error);
      }
    } catch (err) {
      console.error('Error loading avatar:', err);
    }
  };

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

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={hypeLogo} alt="Hype" className="h-8" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Return to Dashboard
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Upgrade
            </Link>
          </nav>
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
                  {avatarUrl && <AvatarImage src={avatarUrl} alt="Profile" />}
                  <AvatarFallback className="bg-foreground text-background">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card z-50">
              <Link to="/dashboard">
                <DropdownMenuItem className="cursor-pointer py-3">
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  Dashboard
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
  );
};
