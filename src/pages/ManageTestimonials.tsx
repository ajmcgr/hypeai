import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Star, Download, Upload, Trash2, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ManageTestimonials = () => {
  const [testimonialPages, setTestimonialPages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    author: '',
    email: '',
    content: '',
    rating: 5,
    avatarUrl: '',
  });

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
    
    // Trigger custom event for real-time updates
    window.dispatchEvent(new CustomEvent('reviewsUpdated', { detail: { pageSlug: testimonial.pageSlug } }));
    
    loadData();
    toast({
      title: "Approved",
      description: "Review has been approved and is now visible on your public page",
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

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      author: testimonial.author || '',
      email: testimonial.email || '',
      content: testimonial.content || '',
      rating: testimonial.rating || 5,
      avatarUrl: testimonial.avatarUrl || '',
    });
  };

  const handleSaveEdit = () => {
    if (!editingTestimonial) return;

    const pageTestimonials = JSON.parse(localStorage.getItem(`hype_reviews_${editingTestimonial.pageSlug}`) || '[]');
    const updatedTestimonials = pageTestimonials.map((t: any) => 
      t.id === editingTestimonial.id ? { 
        ...t, 
        author: editForm.author,
        email: editForm.email,
        content: editForm.content,
        rating: editForm.rating,
        avatarUrl: editForm.avatarUrl,
      } : t
    );
    localStorage.setItem(`hype_reviews_${editingTestimonial.pageSlug}`, JSON.stringify(updatedTestimonials));
    
    // Trigger custom event for real-time updates
    window.dispatchEvent(new CustomEvent('reviewsUpdated', { detail: { pageSlug: editingTestimonial.pageSlug } }));
    
    loadData();
    setEditingTestimonial(null);
    toast({
      title: "Updated",
      description: "Review has been updated successfully",
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
                      {testimonial.authorAvatar ? (
                        <img src={testimonial.authorAvatar} alt={testimonial.author} className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-muted text-foreground">
                          {testimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{testimonial.author}</h3>
                          <p className="text-sm text-muted-foreground">
                            via {testimonial.source}
                            {testimonial.locationName && ` • ${testimonial.locationName}`}
                            {testimonial.pageName && ` • ${testimonial.pageName}`}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {testimonial.type === 'video' && testimonial.videoUrl ? (
                        <div className="mb-4">
                          {testimonial.embedHtml ? (
                            <div 
                              dangerouslySetInnerHTML={{ __html: testimonial.embedHtml }}
                              className="w-full max-w-md rounded-lg overflow-hidden"
                            />
                          ) : (
                            <video 
                              src={testimonial.videoUrl} 
                              controls 
                              className="w-full max-w-md rounded-lg border"
                            />
                          )}
                        </div>
                      ) : (
                        <p className="text-foreground leading-relaxed mb-4">
                          {testimonial.content}
                        </p>
                      )}
                      {testimonial.createdAt && (
                        <p className="text-xs text-muted-foreground mb-4">
                          {new Date(testimonial.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
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
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDecline(testimonial)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDecline(testimonial)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
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
                      {testimonial.avatarUrl ? (
                        <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-muted text-foreground">
                          {testimonial.author.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{testimonial.author}</h3>
                          <p className="text-sm text-muted-foreground">
                            via {testimonial.source}
                            {testimonial.locationName && ` • ${testimonial.locationName}`}
                            {testimonial.pageName && ` • ${testimonial.pageName}`}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {testimonial.type === 'video' && testimonial.videoUrl ? (
                        <div>
                          {testimonial.embedHtml ? (
                            <>
                              <div 
                                dangerouslySetInnerHTML={{ __html: testimonial.embedHtml }}
                                className="w-full max-w-md rounded-lg overflow-hidden mb-2"
                              />
                              {testimonial.content && (
                                <p className="text-foreground leading-relaxed text-sm">
                                  {testimonial.content}
                                </p>
                              )}
                            </>
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-foreground leading-relaxed">
                          {testimonial.content}
                        </p>
                      )}
                      {testimonial.createdAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(testimonial.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDecline(testimonial)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingTestimonial} onOpenChange={() => setEditingTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-author">Author Name</Label>
              <Input
                id="edit-author"
                value={editForm.author}
                onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                placeholder="Enter author name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Review Content</Label>
              <Textarea
                id="edit-content"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                placeholder="Enter review content"
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rating">Rating</Label>
              <Input
                id="edit-rating"
                type="number"
                min="1"
                max="5"
                value={editForm.rating}
                onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) || 5 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-avatar">Avatar URL</Label>
              <Input
                id="edit-avatar"
                type="url"
                value={editForm.avatarUrl}
                onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
              {editForm.avatarUrl && (
                <div className="mt-2">
                  <Avatar className="w-16 h-16">
                    <img src={editForm.avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                  </Avatar>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTestimonials;
