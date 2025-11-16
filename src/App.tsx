import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Customers from "./pages/Customers";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import Instagram from "./pages/platforms/Instagram";
import YouTube from "./pages/platforms/YouTube";
import TikTok from "./pages/platforms/TikTok";
import Twitter from "./pages/platforms/Twitter";
import LinkedIn from "./pages/platforms/LinkedIn";
import Facebook from "./pages/platforms/Facebook";
import WhatsApp from "./pages/platforms/WhatsApp";
import Telegram from "./pages/platforms/Telegram";
import Threads from "./pages/platforms/Threads";
import Snapchat from "./pages/platforms/Snapchat";
import SocialMediaImports from "./pages/SocialMediaImports";
import OtherReviewsImports from "./pages/OtherReviewsImports";
import ReviewsPages from "./pages/ReviewsPages";
import Analytics from "./pages/Analytics";
import Forms from "./pages/Forms";
import HashtagGenerator from "./pages/tools/HashtagGenerator";
import ContentPlanner from "./pages/tools/ContentPlanner";
import InfluencerRateCalculator from "./pages/tools/InfluencerRateCalculator";
import BioTextGenerator from "./pages/tools/BioTextGenerator";
import CaptionGenerator from "./pages/tools/CaptionGenerator";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import TestimonialInbox from "./pages/TestimonialInbox";
import PublicReviews from "./pages/PublicReviews";
import WallOfLove from "./pages/embeds/WallOfLove";
import SingleTestimonial from "./pages/embeds/SingleTestimonial";
import Badge from "./pages/embeds/Badge";
import CollectingWidget from "./pages/embeds/CollectingWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reviews/:spaceId/inbox" element={<TestimonialInbox />} />
          <Route path="/reviews/:spaceName" element={<PublicReviews />} />
          <Route path="/embeds/wall-of-love" element={<WallOfLove />} />
          <Route path="/embeds/single-testimonial" element={<SingleTestimonial />} />
          <Route path="/embeds/badge" element={<Badge />} />
          <Route path="/embeds/collecting-widget" element={<CollectingWidget />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/features" element={<Features />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/platforms/instagram" element={<Instagram />} />
          <Route path="/platforms/youtube" element={<YouTube />} />
          <Route path="/platforms/tiktok" element={<TikTok />} />
          <Route path="/platforms/twitter" element={<Twitter />} />
          <Route path="/platforms/linkedin" element={<LinkedIn />} />
          <Route path="/platforms/facebook" element={<Facebook />} />
          <Route path="/platforms/whatsapp" element={<WhatsApp />} />
          <Route path="/platforms/telegram" element={<Telegram />} />
          <Route path="/platforms/threads" element={<Threads />} />
          <Route path="/platforms/snapchat" element={<Snapchat />} />
          <Route path="/social-media" element={<SocialMediaImports />} />
          <Route path="/other-reviews" element={<OtherReviewsImports />} />
          <Route path="/reviews-pages" element={<ReviewsPages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
          <Route path="/tools/content-planner" element={<ContentPlanner />} />
          <Route path="/tools/influencer-rate-calculator" element={<InfluencerRateCalculator />} />
          <Route path="/tools/bio-text-generator" element={<BioTextGenerator />} />
          <Route path="/tools/caption-generator" element={<CaptionGenerator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
