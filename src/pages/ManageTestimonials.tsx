import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Star, Download, Upload } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Input } from "@/components/ui/input";

const ManageTestimonials = () => {
  const [testimonialPages, setTestimonialPages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      description: "Review has been approved",
    });
  };

  const handleDecline = (testimonial: any) => {
    const pageTestimonials = JSON.parse(localStorage.getItem(`hype_reviews_${testimonial.pageSlug}`) || '[]');
    const updatedTestimonials = pageTestimonials.filter((t: any) => t.id !== testimonial.id);
    localStorage.setItem(`hype_reviews_${testimonial.pageSlug}`, JSON.stringify(updatedTestimonials));
    loadData();
    toast({
      title: "Declined",
      description: "Review has been removed",
    });
  };

  const exportToCSV = () => {
    if (testimonials.length === 0) {
      toast({
        title: "No Data",
        description: "No testimonials to export",
        variant: "destructive",
      });
      return;
    }

    // CSV headers
    const headers = ["ID", "Author", "Email", "Content", "Rating", "Type", "Source", "Status", "Page", "Created At", "Video URL", "Post URL"];
    
    // Convert testimonials to CSV rows
    const rows = testimonials.map(t => [
      t.id,
      t.author || "",
      t.email || "",
      `"${(t.content || "").replace(/"/g, '""')}"`, // Escape quotes
      t.rating || 5,
      t.type || "text",
      t.source || "form",
      t.status || "pending",
      t.pageName || t.pageSlug || "",
      t.createdAt || t.importedAt || new Date().toISOString(),
      t.videoUrl || "",
      t.url || ""
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `testimonials_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${testimonials.length} testimonials to CSV`,
    });
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter(line => line.trim());
        
        if (lines.length < 2) {
          toast({
            title: "Empty File",
            description: "CSV file contains no data",
            variant: "destructive",
          });
          return;
        }

        // Parse CSV (skip header row)
        const dataLines = lines.slice(1);
        let importedCount = 0;

        dataLines.forEach(line => {
          // Simple CSV parsing (handle quoted fields)
          const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
          const values = line.split(regex).map(v => v.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
          
          if (values.length < 9) return; // Skip invalid rows

          const [id, author, email, content, rating, type, source, status, pageName, createdAt, videoUrl, postUrl] = values;

          // Find or use first page
          const targetPage = testimonialPages.find(p => p.name === pageName || p.slug === pageName) || testimonialPages[0];
          
          if (!targetPage) {
            return; // Skip if no pages exist
          }

          const testimonial = {
            id: id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
            author: author || "Anonymous",
            email: email || "",
            content: content || "",
            rating: parseInt(rating) || 5,
            type: type || "text",
            source: source || "import",
            status: status || "pending",
            createdAt: createdAt || new Date().toISOString(),
            videoUrl: videoUrl || undefined,
            url: postUrl || undefined,
          };

          // Add to page's testimonials
          const storageKey = `hype_reviews_${targetPage.slug}`;
          const existingTestimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
          
          // Check if testimonial already exists
          const exists = existingTestimonials.some((t: any) => t.id === testimonial.id);
          if (!exists) {
            existingTestimonials.push(testimonial);
            localStorage.setItem(storageKey, JSON.stringify(existingTestimonials));
            importedCount++;
          }
        });

        loadData();
        toast({
          title: "Import Successful",
          description: `Imported ${importedCount} testimonials from CSV`,
        });

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error parsing CSV:", error);
        toast({
          title: "Import Failed",
          description: "Error parsing CSV file. Please check the format.",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  const pendingTestimonials = testimonials.filter(t => t.status === 'pending');
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
          <h1 className="font-reckless text-4xl font-medium mb-2">Manage Reviews</h1>
          <p className="text-muted-foreground">Review and approve reviews from all your pages</p>
          </div>
          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Import CSV
            </Button>
            <Button
              onClick={exportToCSV}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Pending Reviews */}
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
                      {testimonial.type === 'video' && testimonial.videoUrl ? (
                        <div className="mb-4">
                          <video 
                            src={testimonial.videoUrl} 
                            controls 
                            className="w-full max-w-md rounded-lg border"
                          />
                        </div>
                      ) : (
                        <p className="text-foreground leading-relaxed mb-4">
                          {testimonial.content}
                        </p>
                      )}
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
                      {testimonial.type === 'video' && testimonial.videoUrl ? (
                        <div>
                          <video 
                            src={testimonial.videoUrl} 
                            controls 
                            className="w-full max-w-md rounded-lg border mb-2"
                          />
                          {testimonial.content && (
                            <p className="text-foreground leading-relaxed text-sm">
                              {testimonial.content}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-foreground leading-relaxed">
                          {testimonial.content}
                        </p>
                      )}
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
