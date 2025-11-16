import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

const PublicReviews = () => {
  const { spaceName } = useParams();
  const [reviews, setReviews] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    // Load review page data
    const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
    const currentPage = pages.find((p: any) => p.slug === spaceName);
    setPageData(currentPage);

    // Load reviews
    const storageKey = `hype_reviews_${spaceName}`;
    const storedReviews = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setReviews(storedReviews);
  }, [spaceName]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <img src={hypeLogo} alt="Hype" className="h-8" />
        </div>
      </header>

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
            {pageData?.headerTitle || pageData?.name || spaceName || "Reviews"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {pageData?.customMessage || "Customer Reviews & Testimonials"}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <Card className="p-8 rounded-2xl border-2 text-center">
              <p className="text-muted-foreground">No reviews yet. Import reviews to see them here!</p>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="p-6 rounded-2xl border-2">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-muted text-foreground">
                      {review.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <p className="text-sm text-muted-foreground">via {review.source}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed mb-2">
                      {review.content}
                    </p>
                    {review.url && (
                      <a 
                        href={review.url} 
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
      </div>
    </div>
  );
};

export default PublicReviews;
