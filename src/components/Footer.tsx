import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div>
            <h4 className="font-sans font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><a href="https://blog.works.xyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Blog</a></li>
              <li><a href="https://discord.gg/dhBC2KrY22" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@trypost.ai" className="text-muted-foreground hover:text-foreground">Support</a></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold mb-4">Customers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/customers/agencies" className="text-muted-foreground hover:text-foreground">Agencies</Link></li>
              <li><Link to="/customers/course-creators" className="text-muted-foreground hover:text-foreground">Course Creators</Link></li>
              <li><Link to="/customers/creators" className="text-muted-foreground hover:text-foreground">Creators</Link></li>
              <li><Link to="/customers/ecommerce" className="text-muted-foreground hover:text-foreground">Ecommerce</Link></li>
              <li><Link to="/customers/employee-testimonials" className="text-muted-foreground hover:text-foreground">Employee testimonials</Link></li>
              <li><Link to="/customers/freelancers" className="text-muted-foreground hover:text-foreground">Freelancers</Link></li>
              <li><Link to="/customers/newsletters" className="text-muted-foreground hover:text-foreground">Newsletters</Link></li>
              <li><Link to="/customers/saas" className="text-muted-foreground hover:text-foreground">SaaS</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold mb-4">Free Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/hashtag-generator" className="text-muted-foreground hover:text-foreground">Hashtag Generator</Link></li>
              <li><Link to="/tools/content-planner" className="text-muted-foreground hover:text-foreground">Content Planner</Link></li>
              <li><Link to="/tools/influencer-rate-calculator" className="text-muted-foreground hover:text-foreground">Influencer Rate Calculator</Link></li>
              <li><Link to="/tools/bio-text-generator" className="text-muted-foreground hover:text-foreground">Bio Text Generator</Link></li>
              <li><Link to="/tools/caption-generator" className="text-muted-foreground hover:text-foreground">Caption Generator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://x.com/tryhypeai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">X</a></li>
              <li><a href="https://discord.gg/dhBC2KrY22" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          Copyright © 2025 Works App, Inc. Built with ♥️ by <a href="https://works.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Works</a>.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
