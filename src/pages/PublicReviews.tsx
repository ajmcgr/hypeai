import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import hypeLogo from "@/assets/hype-logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const PublicReviews = () => {
  const { spaceName } = useParams();

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
          <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-reckless text-4xl font-medium mb-2">{spaceName || "Test"}</h1>
          <p className="text-lg text-muted-foreground">Customer Reviews & Testimonials</p>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          <Card className="p-6 rounded-2xl border-2">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-muted text-foreground">
                  AM
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">Alex MacGregor</h3>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                  <div className="flex gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">
                  This product has completely transformed how we gather customer feedback. The interface is intuitive and the results speak for themselves.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicReviews;
