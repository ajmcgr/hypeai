import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const TestimonialValueCalculator = () => {
  const [monthlyCustomers, setMonthlyCustomers] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [avgOrderValue, setAvgOrderValue] = useState("");
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const calculateValue = () => {
    const customers = parseFloat(monthlyCustomers);
    const conversion = parseFloat(conversionRate);
    const orderValue = parseFloat(avgOrderValue);
    
    if (!customers || !conversion || !orderValue) return;
    
    const conversionIncrease = 0.25;
    const additionalRevenue = customers * (orderValue * (conversion / 100)) * conversionIncrease;
    setEstimatedValue(additionalRevenue);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-reckless text-4xl md:text-5xl font-medium">Testimonial Value Calculator</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12">
          Calculate the potential revenue impact of adding testimonials to your website and marketing.
        </p>

        <div className="bg-card p-8 rounded-3xl border-2 border-border mb-8">
          <div className="space-y-4 mb-4">
            <div>
              <label className="block mb-2 font-medium">Monthly website visitors</label>
              <Input 
                type="number"
                placeholder="e.g., 1000"
                value={monthlyCustomers}
                onChange={(e) => setMonthlyCustomers(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Current conversion rate (%)</label>
              <Input 
                type="number"
                placeholder="e.g., 2"
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                step="0.1"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Average order value ($)</label>
              <Input 
                type="number"
                placeholder="e.g., 50"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={calculateValue} className="w-full">Calculate Potential Value</Button>
          
          {estimatedValue !== null && (
            <div className="mt-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-reckless font-medium mb-2">Estimated monthly revenue increase:</h3>
              <p className="text-3xl font-medium text-primary">
                ${estimatedValue.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Based on an average 25% conversion rate increase from testimonials
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready to capture this value with testimonials?</p>
          <Link to="/signup">
            <Button size="lg">Try Hype Free</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialValueCalculator;
