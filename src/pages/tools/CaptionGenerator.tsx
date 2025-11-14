import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const TestimonialFormatter = () => {
  const [rawTestimonial, setRawTestimonial] = useState("");
  const [formattedTestimonial, setFormattedTestimonial] = useState("");

  const formatTestimonial = () => {
    if (!rawTestimonial.trim()) return;
    const formatted = `"${rawTestimonial.trim()}"\n\nThis testimonial has been formatted for display on your website or marketing materials.`;
    setFormattedTestimonial(formatted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Testimonial Formatter</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Format and polish your testimonials for professional display on your website and marketing materials.
        </p>

        <div className="bg-card p-8 rounded-3xl border-2 border-border mb-8">
          <label className="block mb-2 font-medium">Paste your testimonial</label>
          <Textarea 
            placeholder="Paste the testimonial you received..."
            value={rawTestimonial}
            onChange={(e) => setRawTestimonial(e.target.value)}
            className="mb-4 min-h-[120px]"
          />
          <Button onClick={formatTestimonial} className="w-full">Format Testimonial</Button>
          
          {formattedTestimonial && (
            <div className="mt-6">
              <h3 className="font-reckless font-medium mb-3">Formatted testimonial:</h3>
              <Textarea 
                value={formattedTestimonial} 
                readOnly 
                className="min-h-[150px]"
              />
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigator.clipboard.writeText(formattedTestimonial)}
              >
                Copy to Clipboard
              </Button>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Want to automatically collect and display testimonials?</p>
          <Link to="/signup">
            <Button size="lg">Try Hype Free</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialFormatter;
