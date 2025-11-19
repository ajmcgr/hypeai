import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Building, Heart } from "lucide-react";

const EmployeeTestimonials = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showSignup />
      
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-reckless text-5xl md:text-6xl font-medium mb-6 tracking-tight">
            Employee Testimonials
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Attract top talent by showcasing authentic employee experiences and your company culture.
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
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Attract Talent</h3>
              <p className="text-muted-foreground">
                Show potential employees what it's really like to work at your company.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Company Culture</h3>
              <p className="text-muted-foreground">
                Highlight your values and culture through authentic employee stories.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Employee Advocacy</h3>
              <p className="text-muted-foreground">
                Turn your team into brand ambassadors with their testimonials.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EmployeeTestimonials;
