import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music as TikTokIcon, MessageSquare, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TikTok = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <TikTokIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Collect TikTok Testimonials</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Import testimonials from TikTok comments and direct messages. Turn viral engagement into powerful social proof.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <MessageSquare className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Comment Collection</h3>
            <p className="text-muted-foreground">
              Automatically collect positive comments from your TikTok videos and showcase them as testimonials.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <Heart className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Viral Proof</h3>
            <p className="text-muted-foreground">
              Display testimonials with TikTok engagement metrics to show authentic social proof.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
              Start Collecting TikTok Testimonials
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TikTok;
