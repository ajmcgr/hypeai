import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const TestimonialWallDescription = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");

  const generateDescription = () => {
    if (!businessName.trim()) return;
    const desc = `Welcome to ${businessName}'s testimonial wall! Here you'll find authentic reviews and feedback from our amazing customers. Every testimonial represents a real experience and showcases why people love working with us. Browse through to see what makes ${businessName} special!`;
    setDescription(desc);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Testimonial Wall Description Generator</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Generate compelling descriptions for your testimonial wall or review page that encourage visitors to explore your social proof.
        </p>

        <div className="bg-card p-8 rounded-3xl border-2 border-border mb-8">
          <label className="block mb-2 font-medium">Your business name</label>
          <Input 
            placeholder="e.g., My Business"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mb-4"
          />
          <Button onClick={generateDescription} className="w-full">Generate Description</Button>
          
          {description && (
            <div className="mt-6">
              <h3 className="font-reckless font-medium mb-3">Your testimonial wall description:</h3>
              <Textarea 
                value={description} 
                readOnly 
                className="min-h-[120px]"
              />
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigator.clipboard.writeText(description)}
              >
                Copy to Clipboard
              </Button>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready to create your own testimonial wall?</p>
          <Link to="/signup">
            <Button size="lg">Try Hype Free</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialWallDescription;
