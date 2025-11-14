import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hypeLogo from "@/assets/hype-logo.png";

interface HeaderProps {
  showSignup?: boolean;
}

const Header = ({ showSignup = false }: HeaderProps) => {
  return (
    <header className="bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={hypeLogo} alt="Hype" className="h-8 sm:h-10" />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <Link to="/integrations" className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors">
            Integrations
          </Link>
          <Link to="/pricing" className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          {showSignup && (
            <>
              <Link to="/login" className="hidden sm:inline-block text-sm text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/signup">
                <Button className="text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10">Sign Up →</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
