import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Store, Briefcase, GraduationCap, Smartphone } from "lucide-react";

const Customers = () => {
  const customerTypes = [
    {
      id: "b2b",
      icon: Building2,
      title: "B2B Companies",
      subtitle: "Make your marketing easy",
      description: "Testimonials provide potential customers with a positive view of your product or service. Putting a customer success story in a video testimonial will help your business stand out in competitive markets, boost sales, and strengthen customer relationships.",
    },
    {
      id: "ecommerce",
      icon: Store,
      title: "eCommerce & Retail",
      subtitle: "People buy from people",
      description: "Who doesn't read reviews before making any purchase? Social proof is so critical, especially in the eCommerce industry. People buy from people. Add some human touch to your products. It will drive more conversion, and boost your revenue.",
    },
    {
      id: "agencies",
      icon: Briefcase,
      title: "Agencies & Freelancers",
      subtitle: "Let clients speak for you",
      description: "If you are trying to close a deal with a lead, or trying to get more leads, testimonials from your previous clients would be the catalyst to make everything happen. Your leads will know if they work with you, they would be in a good team, and get a happy result as well.",
    },
    {
      id: "creators",
      icon: GraduationCap,
      title: "Course Creators",
      subtitle: "Showcase student success",
      description: "Build trust with potential students by showcasing real results. Video testimonials from successful students are powerful social proof that demonstrates the value of your courses and increases enrollment rates.",
    },
    {
      id: "apps",
      icon: Smartphone,
      title: "Consumer Apps",
      subtitle: "Drive more conversions",
      description: "What makes your app stand out among competitors? It's the testimonial! Testimonials have contagious power. They convince other people to give it a try. It's the word of mouth that drives downloads and engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showSignup={true} />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-4">Our customers</p>
          <h1 className="font-reckless text-4xl md:text-5xl font-bold mb-6">
            Leverage your social proof
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hype makes collecting text and video testimonials fast and easy for any business who needs social proof.
          </p>
        </div>

        {/* Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {customerTypes.map((type) => (
            <a
              key={type.id}
              href={`#${type.id}`}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
            >
              {type.title}
            </a>
          ))}
        </div>

        {/* Customer Type Sections */}
        <div className="space-y-24">
          {customerTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <section key={type.id} id={type.id} className="scroll-mt-20">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.title}</span>
                    </div>
                    <h2 className="font-reckless text-3xl font-bold mb-4">{type.subtitle}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {type.description}
                    </p>
                    <Link to="/signup">
                      <Button size="lg">Start Free Trial →</Button>
                    </Link>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-16 h-16 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="mt-24 text-center py-16 px-8 rounded-2xl bg-primary/5">
          <h2 className="font-reckless text-3xl font-bold mb-4">
            Ready to leverage social proof?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Hype to collect and showcase testimonials that drive real results.
          </p>
          <Link to="/signup">
            <Button size="lg">Get Started Free →</Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Customers;
