import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";

const ManageTestimonials = () => {
  const [testimonialPages, setTestimonialPages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
    setTestimonialPages(pages);
    
    // Load all testimonials from all pages
    const allTestimonials: any[] = [];
    pages.forEach((page: any) => {
      const pageTestimonials = JSON.parse(localStorage.getItem(`hype_reviews_${page.slug}`) || '[]');
      pageTestimonials.forEach((testimonial: any) => {
        allTestimonials.push({
          ...testimonial,
          pageSlug: page.slug,
          pageName: page.name,
          status: testimonial.status || 'pending'
        });
      });
    });
    setTestimonials(allTestimonials);
  };

  const handleApprove = (testimonial: any) => {
    const pageTestimonials = JSON.parse(localStorage.getItem(`hype_reviews_${testimonial.pageSlug}`) || '[]');
    const updatedTestimonials = pageTestimonials.map((t: any) => 
      t.id === testimonial.id ? { ...t, status: 'approved' } : t
    );
    localStorage.setItem(`hype_reviews_${testimonial.pageSlug}`, JSON.stringify(updatedTestimonials));
    loadData();
    toast({
      title: "Approved",
      description: "Testimonial has been approved",
    });
  };

  const handleDecline = (testimonial: any) => {
    const pageTestimonials = JSON.parse(localStorage.getItem(`hype_reviews_${testimonial.pageSlug}`) || '[]');
    const updatedTestimonials = pageTestimonials.filter((t: any) => t.id !== testimonial.id);
    localStorage.setItem(`hype_reviews_${testimonial.pageSlug}`, JSON.stringify(updatedTestimonials));
    loadData();
    toast({
      title: "Declined",
      description: "Testimonial has been removed",
    });
  };

  const pendingTestimonials = testimonials.filter(t => t.status === 'pending');
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-reckless text-4xl font-medium mb-2">Manage Testimonials</h1>
          <p className="text-muted-foreground">Review and approve testimonials from all your pages</p>
        </div>

        {/* Pending Testimonials */}
        <div className="mb-12">
          <h2 className="font-reckless text-2xl font-medium mb-6">
            Pending Approval ({pendingTestimonials.length})
          </h2>
          
          {pendingTestimonials.length === 0 ? (
            <Card className="p-8 rounded-2xl border-2 text-center">
              <p className="text-muted-foreground">No pending testimonials</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 rounded-2xl border-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-muted text-foreground">
                        {testimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{testimonial.author}</h3>
                          <p className="text-sm text-muted-foreground">
                            via {testimonial.source} • {testimonial.pageName}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed mb-4">
                        {testimonial.content}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(testimonial)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDecline(testimonial)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Approved Testimonials */}
        <div>
          <h2 className="font-reckless text-2xl font-medium mb-6">
            Approved ({approvedTestimonials.length})
          </h2>
          
          {approvedTestimonials.length === 0 ? (
            <Card className="p-8 rounded-2xl border-2 text-center">
              <p className="text-muted-foreground">No approved testimonials yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {approvedTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 rounded-2xl border-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-muted text-foreground">
                        {testimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{testimonial.author}</h3>
                          <p className="text-sm text-muted-foreground">
                            via {testimonial.source} • {testimonial.pageName}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;
