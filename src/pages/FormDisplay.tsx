import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Video as VideoIcon, StopCircle, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const FormDisplay = () => {
  const { formId } = useParams();
  const { toast } = useToast();
  const [form, setForm] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
    const foundForm = forms.find((f: any) => f.id === formId);
    
    if (foundForm) {
      setForm(foundForm);
      
      // Load page data
      const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
      const page = pages.find((p: any) => p.slug === foundForm.reviewsPage);
      setPageData(page);
    }
  }, [formId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
      });
      
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        
        // Upload to Supabase
        await uploadVideo(blob);
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Your video testimonial is now being recorded.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Could not access camera/microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Stopped",
        description: "Processing your video...",
      });
    }
  };

  const uploadVideo = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const fileName = `${form.reviewsPage}/${Date.now()}_video.webm`;
      
      const { data, error } = await supabase.storage
        .from('video-testimonials')
        .upload(fileName, blob, {
          contentType: 'video/webm',
          cacheControl: '3600',
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('video-testimonials')
        .getPublicUrl(fileName);

      // Store video URL for submission
      setRecordedVideoUrl(urlData.publicUrl);
      
      toast({
        title: "Video Uploaded",
        description: "Your video has been uploaded successfully!",
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload Failed",
        description: "Could not upload video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the page slug from the form's reviewsPage
    const storageKey = `hype_reviews_${form.reviewsPage}`;
    const testimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newTestimonial = {
      id: Date.now().toString(),
      spaceName: form.reviewsPage,
      author: name,
      email,
      content: testimonial,
      rating,
      type: recordedVideoUrl ? 'video' : 'text',
      videoUrl: recordedVideoUrl || undefined,
      source: 'form',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    testimonials.push(newTestimonial);
    localStorage.setItem(storageKey, JSON.stringify(testimonials));
    
    toast({
      title: "Thank you!",
      description: "Your testimonial has been submitted and is pending approval.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setTestimonial("");
    setRating(0);
    setRecordedVideoUrl(null);
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Form Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This form does not exist or has been deleted.
          </p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-8 text-center">
          {pageData?.logo && (
            <img 
              src={pageData.logo} 
              alt={form.name}
              className="h-16 mx-auto mb-4"
            />
          )}
          <h1 className="font-reckless text-3xl font-medium mb-2">
            {form.headerTitle || form.name}
          </h1>
          {form.customMessage && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {form.customMessage}
            </p>
          )}
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <Card className="p-8 rounded-2xl border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Option */}
            {form.collectVideo && (
              <div className="p-6 border-2 border-dashed rounded-xl">
                <div className="text-center mb-4">
                  <VideoIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-2">Record a Video Testimonial</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your experience on camera
                  </p>
                </div>

                {/* Video Preview */}
                <div className="mb-4">
                  <video
                    ref={videoRef}
                    className="w-full rounded-lg bg-black"
                    style={{ maxHeight: '400px' }}
                    controls={recordedVideoUrl !== null}
                    src={recordedVideoUrl || undefined}
                  />
                </div>

                {/* Recording Controls */}
                <div className="flex gap-2 justify-center">
                  {!isRecording && !recordedVideoUrl && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={startRecording}
                      className="gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start Recording
                    </Button>
                  )}
                  
                  {isRecording && (
                    <Button 
                      type="button" 
                      variant="destructive"
                      onClick={stopRecording}
                      className="gap-2"
                    >
                      <StopCircle className="w-4 h-4" />
                      Stop Recording
                    </Button>
                  )}
                  
                  {recordedVideoUrl && !isRecording && (
                    <>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setRecordedVideoUrl(null);
                          if (videoRef.current) {
                            videoRef.current.src = '';
                          }
                        }}
                      >
                        Record Again
                      </Button>
                      {isUploading && (
                        <span className="text-sm text-muted-foreground self-center">
                          Uploading...
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Star Rating */}
            {form.collectStars && (
              <div className="space-y-2">
                <Label>Rating *</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Fields */}
            {form.collectText && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial">Your Testimonial *</Label>
                  <Textarea
                    id="testimonial"
                    value={testimonial}
                    onChange={(e) => setTestimonial(e.target.value)}
                    required
                    placeholder="Share your experience..."
                    rows={6}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg">
              Submit Testimonial
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default FormDisplay;
