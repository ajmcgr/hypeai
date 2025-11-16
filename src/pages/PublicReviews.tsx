import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

const PublicTestimonials = () => {
  const { spaceName } = useParams();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [userPlan, setUserPlan] = useState<string>("Free");

  useEffect(() => {
    // Load testimonial page data
    const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
    const currentPage = pages.find((p: any) => p.slug === spaceName);
    setPageData(currentPage);

    // Load approved testimonials only
    const storageKey = `hype_reviews_${spaceName}`;
    const storedTestimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const approvedTestimonials = storedTestimonials.filter((t: any) => t.status === 'approved');
    setTestimonials(approvedTestimonials);
    
    // TODO: Get actual user plan from database/auth
    setUserPlan("Free");
  }, [spaceName]);

  const showBranding = userPlan === "Free";

  const displayStyle = pageData?.displayStyle || 'list';

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: pageData?.backgroundColor || '#ffffff',
        color: pageData?.fontColor || '#000000'
      }}
    >
      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Space Header */}
        <div className="text-center mb-12">
          {pageData?.logo ? (
            <img 
              src={pageData.logo} 
              alt={`${pageData.name} logo`} 
              className="w-20 h-20 rounded-lg object-cover mx-auto mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-10 h-10 text-primary-foreground" />
            </div>
          )}
          <h1 className="font-reckless text-4xl font-medium mb-2">
            {pageData?.headerTitle || pageData?.name || spaceName || "Testimonials"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {pageData?.customMessage || "Customer Testimonials"}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={displayStyle === 'wall' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {testimonials.length === 0 ? (
            <Card className="p-8 rounded-2xl border-2 text-center">
              <p className="text-muted-foreground">No testimonials yet. Import testimonials to see them here!</p>
            </Card>
          ) : (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 rounded-2xl border-2">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-muted text-foreground">
                      {testimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{testimonial.author}</h3>
                        <p className="text-sm text-muted-foreground">via {testimonial.source}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed mb-2">
                      {testimonial.content}
                    </p>
                    {testimonial.url && (
                      <a 
                        href={testimonial.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View original →
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        {/* Footer Branding for Free Accounts */}
        {showBranding && (
          <div className="text-center mt-12 pt-8 border-t">
            <a 
              href="https://tryhype.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              Create your own testimonial page tryhype.ai →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTestimonials;
