import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, TrendingUp, Award } from "lucide-react";

const Ecommerce = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showSignup />
      
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-reckless text-5xl md:text-6xl font-medium mb-6 tracking-tight">
            Testimonials for Ecommerce
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Increase conversions and build customer trust with authentic product reviews and customer testimonials.
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
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Product Reviews</h3>
              <p className="text-muted-foreground">
                Collect and display customer reviews that drive purchasing decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Increase Sales</h3>
              <p className="text-muted-foreground">
                Boost conversion rates with social proof displayed at key touchpoints.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Build Brand Trust</h3>
              <p className="text-muted-foreground">
                Establish credibility with verified customer feedback and ratings.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Ecommerce;
