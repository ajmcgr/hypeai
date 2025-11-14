import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Youtube, MessageSquare, Video } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const YouTube = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-google-red/10 flex items-center justify-center">
            <Youtube className="w-8 h-8 text-google-red" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Collect YouTube Testimonials</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Import testimonials from YouTube comments and community posts. Showcase authentic feedback from your video content viewers.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <MessageSquare className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Comment Import</h3>
            <p className="text-muted-foreground">
              Automatically import positive comments from your YouTube videos and turn them into testimonials.
            </p>
          </div>
          <div className="p-6 rounded-2xl border-2 border-border bg-card">
            <Video className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-reckless text-xl font-medium mb-2">Video Testimonials</h3>
            <p className="text-muted-foreground">
              Collect video testimonials from your subscribers and display them on your website.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-2xl">
              Start Collecting YouTube Testimonials
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default YouTube;
