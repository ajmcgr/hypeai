import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Mail, Grid3x3, MessageSquare, Award, Eye, EyeOff, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ManageReviews = () => {
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

  const handleTogglePublish = (page: any) => {
    const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
    const updatedPages = pages.map((p: any) => 
      p.slug === page.slug ? { ...p, published: !p.published } : p
    );
    localStorage.setItem('hype_review_pages', JSON.stringify(updatedPages));
    setReviewPages(updatedPages);
    
    toast({
      title: page.published ? "Page Unpublished" : "Page Published",
      description: page.published 
        ? `${page.name} is now hidden from public view`
        : `${page.name} is now visible to the public`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-reckless text-4xl font-medium mb-4">Share Reviews</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Share your public review pages and collection forms
          </p>

          {reviewPages.length === 0 && forms.length === 0 ? (
            <Card className="p-8 rounded-2xl border-2 text-center">
              <p className="text-muted-foreground">No review pages or forms yet. Create one from the dashboard!</p>
            </Card>
          ) : (
            <div className="space-y-12">
              {/* Review Pages */}
              {reviewPages.map((page) => (
                <div key={page.id}>
                  <h2 className="font-reckless text-2xl font-medium mb-4">{page.name}</h2>
                  
                  {/* Publish Status Toggle */}
                  <Card className="p-6 border-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Page Visibility</h3>
                        <p className="text-sm text-muted-foreground">
                          {page.published !== false ? "Visible on public page" : "Hidden from public view"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {page.published !== false ? (
                            <Eye className="w-4 h-4 text-green-500" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                          <Label className="text-sm font-medium">
                            {page.published !== false ? "Published" : "Unpublished"}
                          </Label>
                        </div>
                        <Switch
                          checked={page.published !== false}
                          onCheckedChange={() => handleTogglePublish(page)}
                        />
                      </div>
                    </div>
                  </Card>
                  
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
                          <p className="text-sm text-muted-foreground">{page.headerTitle || 'Customer Reviews'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link to="/dashboard">
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-2" />
                              Edit page
                            </Button>
                          </Link>
                          <Link to={`/reviews/${page.slug}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Embed Options Card */}
                    <Card className="p-6 border-2">
                      <div className="mb-4">
                        <h3 className="font-reckless text-lg font-medium mb-1">Embed Options</h3>
                        <p className="text-sm text-muted-foreground">Display reviews on your website</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Link to={`/embeds/wall-of-love?page=${page.slug}`}>
                          <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <Grid3x3 className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-medium text-sm mb-1">Wall of Love</h4>
                            <p className="text-xs text-muted-foreground">Masonry grid display</p>
                          </Card>
                        </Link>
                        <Link to={`/embeds/single-review?page=${page.slug}`}>
                          <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <MessageSquare className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-medium text-sm mb-1">Single</h4>
                            <p className="text-xs text-muted-foreground">One review</p>
                          </Card>
                        </Link>
                        <Link to={`/embeds/badge?page=${page.slug}`}>
                          <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <Award className="w-8 h-8 text-primary mb-2" />
                            <h4 className="font-medium text-sm mb-1">Badge</h4>
                            <p className="text-xs text-muted-foreground">Rating badge</p>
                          </Card>
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

export default ManageReviews;
