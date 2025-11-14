import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Shield, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WhatsApp = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-google-green/10 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-google-green" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Collect WhatsApp Testimonials</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Import testimonials from WhatsApp messages. Turn private conversations into powerful public testimonials with permission.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Private to Public</h3>
            <p className="text-muted-foreground">
              Convert WhatsApp feedback into testimonials with proper consent and privacy controls.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <CheckCircle className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Authentic Feedback</h3>
            <p className="text-muted-foreground">
              Showcase genuine, unfiltered feedback from your WhatsApp conversations.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
              Start Collecting WhatsApp Testimonials
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsApp;
