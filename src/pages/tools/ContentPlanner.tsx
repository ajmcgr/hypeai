import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const TestimonialScheduler = () => {
  const [testimonialsPerWeek, setTestimonialsPerWeek] = useState("");
  const [schedule, setSchedule] = useState<string[]>([]);

  const generateSchedule = () => {
    const count = parseInt(testimonialsPerWeek);
    if (!count || count < 1) return;
    
    const days = ["Monday", "Wednesday", "Friday"];
    const scheduleItems = [];
    
    for (let i = 0; i < Math.min(count, days.length); i++) {
      scheduleItems.push(`${days[i]}: Share a testimonial`);
    }
    
    if (count > days.length) {
      scheduleItems.push(`Additional ${count - days.length} testimonials: Spread throughout the week`);
    }
    
    setSchedule(scheduleItems);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Testimonial Posting Scheduler</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Plan when to share testimonials on social media for maximum impact and consistent social proof.
        </p>

        <div className="bg-card p-8 rounded-3xl border-2 border-border mb-8">
          <label className="block mb-2 font-medium">How many testimonials per week?</label>
          <Input 
            type="number"
            placeholder="e.g., 3"
            value={testimonialsPerWeek}
            onChange={(e) => setTestimonialsPerWeek(e.target.value)}
            className="mb-4"
            min="1"
          />
          <Button onClick={generateSchedule} className="w-full">Generate Schedule</Button>
          
          {schedule.length > 0 && (
            <div className="mt-6">
              <h3 className="font-reckless font-medium mb-3">Your posting schedule:</h3>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                {schedule.map((item, index) => (
                  <div key={index} className="text-sm">{item}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Want to automate testimonial collection and display?</p>
          <Link to="/signup">
            <Button size="lg">Try Hype Free</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialScheduler;
