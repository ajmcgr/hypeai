import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send, Users, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Telegram = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-google-blue/10 flex items-center justify-center">
            <Send className="w-8 h-8 text-google-blue" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Collect Telegram Testimonials</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Import testimonials from Telegram groups and channels. Turn your community feedback into valuable social proof.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <Users className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Community Feedback</h3>
            <p className="text-muted-foreground">
              Collect testimonials from your Telegram groups and channels automatically.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <Star className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Real-time Import</h3>
            <p className="text-muted-foreground">
              Automatically capture positive feedback as it happens in your Telegram communities.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
              Start Collecting Telegram Testimonials
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Telegram;
