import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook as FacebookIcon, MessageSquare, ThumbsUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Facebook = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-google-blue/10 flex items-center justify-center">
            <FacebookIcon className="w-8 h-8 text-google-blue" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Collect Facebook Testimonials</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Import testimonials from Facebook comments, reviews, and messages. Leverage your Facebook community as social proof.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <MessageSquare className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Review Import</h3>
            <p className="text-muted-foreground">
              Automatically collect Facebook page reviews and recommendations into your testimonial collection.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <ThumbsUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Community Trust</h3>
            <p className="text-muted-foreground">
              Display testimonials from your Facebook community with real names and profile pictures.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
              Start Collecting Facebook Testimonials
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Facebook;
