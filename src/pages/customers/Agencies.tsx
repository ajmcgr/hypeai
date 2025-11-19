import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Users, Award } from "lucide-react";

const Agencies = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showSignup />
      
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-reckless text-5xl md:text-6xl font-medium mb-6 tracking-tight">
            Testimonials for Agencies
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Build trust with potential clients by showcasing successful case studies and client testimonials that demonstrate your agency's expertise and results.
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
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Showcase Results</h3>
              <p className="text-muted-foreground">
                Display client success stories and ROI-driven testimonials that prove your agency's value.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Win More Clients</h3>
              <p className="text-muted-foreground">
                Convert more prospects by showing authentic feedback from satisfied clients across industries.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Build Authority</h3>
              <p className="text-muted-foreground">
                Establish your agency as an industry leader with a portfolio of glowing client reviews.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Agencies;
