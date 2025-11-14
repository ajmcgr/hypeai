import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost, MessageSquare, Camera } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Snapchat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Ghost className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Collect Snapchat Testimonials</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Import testimonials from Snapchat stories and messages. Capture authentic feedback from your Snapchat audience.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <MessageSquare className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Story Testimonials</h3>
            <p className="text-muted-foreground">
              Collect testimonials from Snapchat stories and direct messages with user permission.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <Camera className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Visual Feedback</h3>
            <p className="text-muted-foreground">
              Showcase authentic visual testimonials from Snapchat's engaged younger audience.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
              Start Collecting Snapchat Testimonials
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Snapchat;
