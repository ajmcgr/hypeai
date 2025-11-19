import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Users } from "lucide-react";

const Creators = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showSignup />
      
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-reckless text-5xl md:text-6xl font-medium mb-6 tracking-tight">
            Testimonials for Creators
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Turn your fans into advocates by collecting and showcasing authentic feedback that builds trust with new audiences.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-xl px-10 py-7 rounded-2xl">
              Start Collecting Testimonials →
            </Button>
          </Link>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Fan Testimonials</h3>
              <p className="text-muted-foreground">
                Collect authentic feedback from your community and showcase their stories.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Build Trust</h3>
              <p className="text-muted-foreground">
                Grow your audience faster with social proof that resonates with potential followers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Community Power</h3>
              <p className="text-muted-foreground">
                Leverage your community's voice to attract brand partnerships and sponsorships.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Creators;
