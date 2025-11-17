import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, Instagram, Youtube, Video, Twitter, Facebook, Phone, Send, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

// Crisp type declaration
declare global {
  interface Window {
    $crisp?: any[];
  }
}

const PublicTestimonials = () => {
  const { spaceName } = useParams();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [userPlan, setUserPlan] = useState<string>("Free");

  useEffect(() => {
    // Hide Crisp chat widget on public page
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:hide"]);
    }

    // Load Google Font dynamically
    const loadFont = (fontName: string) => {
      const existingLink = document.querySelector(`link[data-font="${fontName}"]`);
      if (!existingLink && fontName !== "Inter") {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;500;600;700&display=swap`;
        link.rel = 'stylesheet';
        link.setAttribute('data-font', fontName);
        document.head.appendChild(link);
      }
    };

    const loadTestimonials = () => {
      // Load testimonial page data
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      const currentPage = pages.find((p: any) => p.slug === spaceName);
      
      // Check if page is published (default to true for backwards compatibility)
      if (currentPage && currentPage.published === false) {
        setPageData(null);
        return;
      }
      
      setPageData(currentPage);
      
      // Load the font for this page
      if (currentPage?.font) {
        loadFont(currentPage.font);
      }

      // Load approved testimonials only
      const storageKey = `hype_reviews_${spaceName}`;
      const storedTestimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const approvedTestimonials = storedTestimonials.filter((t: any) => t.status === 'approved');
      console.log('Loading testimonials for', spaceName, '- Found:', approvedTestimonials.length, 'approved reviews');
      console.log('Approved testimonials:', approvedTestimonials);
      setTestimonials(approvedTestimonials);
      
      // TODO: Get actual user plan from database/auth
      setUserPlan("Free");
    };

    loadTestimonials();

    // Listen for storage changes (when reviews are approved in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `hype_reviews_${spaceName}`) {
        console.log('Storage changed, reloading testimonials');
        loadTestimonials();
      }
    };

    // Listen for custom events (when reviews are approved in same tab)
    const handleReviewsUpdated = (e: any) => {
      if (e.detail?.pageSlug === spaceName) {
        console.log('Reviews updated event received, reloading testimonials');
        loadTestimonials();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('reviewsUpdated', handleReviewsUpdated);

    // Show Crisp chat widget again when leaving page
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reviewsUpdated', handleReviewsUpdated);
      if (window.$crisp) {
        window.$crisp.push(["do", "chat:show"]);
      }
    };
  }, [spaceName]);

  const showBranding = userPlan === "Free";

  const displayStyle = pageData?.displayStyle || 'list';
  const cardStyle = pageData?.cardStyle || 'solid';

  // Get card style classes based on selected style
  const getCardClasses = () => {
    switch (cardStyle) {
      case 'glass':
        return 'p-6 rounded-2xl border backdrop-blur-md bg-white/10';
      case 'outline':
        return 'p-6 rounded-2xl border-2 bg-transparent';
      case 'solid':
      default:
        return 'p-6 rounded-2xl border-2';
    }
  };

  const getCardStyle = () => {
    switch (cardStyle) {
      case 'glass':
        return {
          borderColor: `${pageData?.fontColor || '#000000'}20`,
          color: pageData?.fontColor || '#000000'
        };
      case 'outline':
        return {
          borderColor: pageData?.fontColor || '#000000',
          color: pageData?.fontColor || '#000000',
          backgroundColor: 'transparent'
        };
      case 'solid':
      default:
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: pageData?.fontColor || '#000000'
        };
    }
  };

  // Show unpublished message if page is not published
  if (!pageData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Available</h1>
          <p className="text-muted-foreground">
            This page is currently unpublished or does not exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: pageData?.backgroundColor || '#ffffff',
        color: pageData?.fontColor || '#000000',
        fontFamily: pageData?.font ? `"${pageData.font}", sans-serif` : 'Inter, sans-serif'
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
            <div 
              className="w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ 
                backgroundColor: pageData?.buttonColor || '#5D5DFF'
              }}
            >
              <ThumbsUp 
                className="w-10 h-10" 
                style={{ 
                  color: pageData?.buttonTextColor || '#ffffff'
                }}
              />
            </div>
          )}
          <h1 
            className="font-reckless text-4xl font-medium mb-2"
            style={{ color: pageData?.fontColor || '#000000' }}
          >
            {pageData?.headerTitle || pageData?.name || spaceName || "Testimonials"}
          </h1>
          <p 
            className="text-lg mb-6"
            style={{ 
              color: pageData?.fontColor || '#000000'
            }}
          >
            {pageData?.customMessage || "Customer Testimonials"}
          </p>

          {/* Social Media Icons */}
          {(pageData?.instagram || pageData?.youtube || pageData?.tiktok || pageData?.twitter || 
            pageData?.facebook || pageData?.whatsapp || pageData?.telegram || pageData?.threads || 
            pageData?.snapchat) && (
            <div className="flex items-center justify-center gap-4 mt-6">
              {pageData?.instagram && (
                <a
                  href={pageData.instagram.startsWith('http') ? pageData.instagram : `https://instagram.com/${pageData.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {pageData?.youtube && (
                <a
                  href={pageData.youtube.startsWith('http') ? pageData.youtube : `https://youtube.com/${pageData.youtube.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Youtube className="w-6 h-6" />
                </a>
              )}
              {pageData?.tiktok && (
                <a
                  href={pageData.tiktok.startsWith('http') ? pageData.tiktok : `https://tiktok.com/@${pageData.tiktok.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Video className="w-6 h-6" />
                </a>
              )}
              {pageData?.twitter && (
                <a
                  href={pageData.twitter.startsWith('http') ? pageData.twitter : `https://x.com/${pageData.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {pageData?.facebook && (
                <a
                  href={pageData.facebook.startsWith('http') ? pageData.facebook : `https://facebook.com/${pageData.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {pageData?.whatsapp && (
                <a
                  href={pageData.whatsapp.startsWith('http') ? pageData.whatsapp : `https://wa.me/${pageData.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Phone className="w-6 h-6" />
                </a>
              )}
              {pageData?.telegram && (
                <a
                  href={pageData.telegram.startsWith('http') ? pageData.telegram : `https://t.me/${pageData.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <Send className="w-6 h-6" />
                </a>
              )}
              {pageData?.threads && (
                <a
                  href={pageData.threads.startsWith('http') ? pageData.threads : `https://threads.net/@${pageData.threads.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <MessageSquare className="w-6 h-6" />
                </a>
              )}
              {pageData?.snapchat && (
                <a
                  href={pageData.snapchat.startsWith('http') ? pageData.snapchat : `https://snapchat.com/add/${pageData.snapchat}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: pageData?.fontColor || '#000000' }}
                >
                  <MessageSquare className="w-6 h-6" />
                </a>
              )}
            </div>
          )}

          {/* Leave a review button */}
          {pageData?.collectionFormId && (
            <Link to={`/form/${pageData.collectionFormId}`} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="mt-6"
                style={{
                  backgroundColor: pageData?.buttonColor || '#5D5DFF',
                  color: pageData?.buttonTextColor || '#ffffff'
                }}
              >
                Leave a review
              </Button>
            </Link>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className={displayStyle === 'wall' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {testimonials.length === 0 ? (
            <Card 
              className={`${getCardClasses()} text-center`}
              style={getCardStyle()}
            >
              <p style={{ opacity: 0.7 }}>No testimonials yet. Import testimonials to see them here!</p>
            </Card>
          ) : (
            testimonials.map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className={getCardClasses()}
                style={getCardStyle()}
              >
                {/* Video Review */}
                {testimonial.type === 'video' && testimonial.videoUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-black">
                    {testimonial.embedHtml ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: testimonial.embedHtml }}
                        className="w-full h-full"
                      />
                    ) : (
                      <video 
                        controls 
                        className="w-full h-full object-contain"
                      >
                        <source src={testimonial.videoUrl} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    {testimonial.avatarUrl ? (
                      <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-full h-full object-cover" />
                    ) : (
                      <AvatarFallback 
                        style={{ 
                          backgroundColor: pageData?.buttonColor || '#5D5DFF',
                          color: '#ffffff'
                        }}
                      >
                        {testimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 
                          className="font-semibold"
                          style={{ color: pageData?.fontColor || '#000000' }}
                        >
                          {testimonial.author}
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ 
                            color: pageData?.fontColor || '#000000',
                            opacity: 0.6 
                          }}
                        >
                          via {testimonial.source}
                          {testimonial.locationName && ` • ${testimonial.locationName}`}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    {testimonial.content && (
                      <p 
                        className="leading-relaxed mb-2"
                        style={{ color: pageData?.fontColor || '#000000' }}
                      >
                        {testimonial.content}
                      </p>
                    )}
                    {testimonial.createdAt && (
                      <p 
                        className="text-xs mb-2"
                        style={{ 
                          color: pageData?.fontColor || '#000000',
                          opacity: 0.5 
                        }}
                      >
                        {new Date(testimonial.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </p>
                    )}
                    {testimonial.url && (
                      <a 
                        href={testimonial.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm hover:underline inline-flex items-center gap-1"
                        style={{ 
                          color: pageData?.buttonColor || '#5D5DFF'
                        }}
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
              className="text-sm transition-colors inline-flex items-center gap-2"
              style={{ 
                color: pageData?.fontColor || '#000000',
                opacity: 0.6 
              }}
            >
              Create your own reviews page with tryhype.ai →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTestimonials;
