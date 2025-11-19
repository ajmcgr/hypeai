import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, TrendingUp, Star } from "lucide-react";

const CourseCreators = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showSignup />
      
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-reckless text-5xl md:text-6xl font-medium mb-6 tracking-tight">
            Testimonials for Course Creators
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Increase course enrollments by showcasing student success stories and transformative learning experiences.
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
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Student Success</h3>
              <p className="text-muted-foreground">
                Showcase real transformations and learning outcomes from your students.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Boost Enrollments</h3>
              <p className="text-muted-foreground">
                Convert more visitors into students with authentic course reviews and testimonials.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-reckless text-xl font-semibold mb-2">Build Credibility</h3>
              <p className="text-muted-foreground">
                Establish trust and authority in your niche with social proof from happy students.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseCreators;
