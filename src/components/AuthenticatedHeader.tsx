import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, TrendingUp, Settings, LogOut } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export const AuthenticatedHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
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

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={hypeLogo} alt="Hype" className="h-8" />
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Return to Dashboard
          </Link>
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
            <DropdownMenuContent align="end" className="w-56 bg-card z-50">
              <Link to="/dashboard">
                <DropdownMenuItem className="cursor-pointer py-3">
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              
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
  );
};
