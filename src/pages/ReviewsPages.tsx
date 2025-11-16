import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Mail } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { useState, useEffect } from "react";

const ReviewsPages = () => {
  const [reviewPages, setReviewPages] = useState<any[]>([]);
  const [forms, setForms] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      const storedForms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
      setReviewPages(pages);
      setForms(storedForms);
    };
    
    loadData();
    
    window.addEventListener('storage', loadData);
    window.addEventListener('reviewPagesUpdated', loadData);
    
    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('reviewPagesUpdated', loadData);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={hypeLogo} alt="Hype" className="h-8" />
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-reckless text-4xl font-medium mb-4">Reviews Pages</h1>
          <p className="text-lg text-muted-foreground mb-12">
            View and manage your public reviews pages and collection forms
          </p>

          {reviewPages.length === 0 && forms.length === 0 ? (
            <Card className="p-8 rounded-2xl border-2 text-center">
              <p className="text-muted-foreground">No review pages or forms yet. Create one from the dashboard!</p>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Review Pages */}
              {reviewPages.map((page) => (
                <div key={page.id}>
                  <h2 className="font-reckless text-2xl font-medium mb-4">{page.name}</h2>
                  <div className="space-y-4">
                    <Card className="p-6 border-2">
                      <div className="flex items-center gap-4">
                        {page.logo ? (
                          <img 
                            src={page.logo} 
                            alt={page.name} 
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-reckless text-xl font-medium mb-1">Public Reviews Page</h3>
                          <p className="text-sm text-muted-foreground">{page.headerTitle || 'Customer Reviews & Testimonials'}</p>
                        </div>
                        <Link to={`/reviews/${page.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </Card>
                    
                    {/* Forms for this review page */}
                    {forms
                      .filter((form) => form.reviewsPage === page.slug)
                      .map((form) => (
                        <Card key={form.id} className="p-6 border-2">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-reckless text-xl font-medium mb-1">{form.name}</h3>
                              <p className="text-sm text-muted-foreground">Collection form</p>
                            </div>
                            <Link to={`/form/${form.id}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Form
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReviewsPages;
