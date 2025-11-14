import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hypeLogo from "@/assets/hype-logo.png";

interface HeaderProps {
  showSignup?: boolean;
}

const Header = ({ showSignup = false }: HeaderProps) => {
  return (
    <header className="bg-card">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={hypeLogo} alt="Hype" className="h-10" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/integrations" className="text-sm text-foreground hover:text-primary transition-colors">
            Integrations
          </Link>
          <Link to="/pricing" className="text-sm text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          {showSignup && (
            <>
              <Link to="/login" className="text-sm text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/signup">
                <Button>Sign Up →</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
