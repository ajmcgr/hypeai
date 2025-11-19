import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Mail, Grid3x3, MessageSquare, Award, Eye, EyeOff, Settings, Pencil, Trash2, ThumbsUp, Instagram, Youtube, Video, Twitter, Facebook, Phone, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ManageReviews = () => {
  const [reviewPages, setReviewPages] = useState<any[]>([]);
  const [forms, setForms] = useState<any[]>([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditPageOpen, setIsEditPageOpen] = useState(false);
  const [editingFormId, setEditingFormId] = useState<string | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editedFormName, setEditedFormName] = useState("");
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  
  // Edit page states
  const [editedSpaceName, setEditedSpaceName] = useState("");
  const [editedHeaderTitle, setEditedHeaderTitle] = useState("");
  const [editedCustomMessage, setEditedCustomMessage] = useState("");
  const [editedCollectStarRatings, setEditedCollectStarRatings] = useState(true);
  const [editedButtonColor, setEditedButtonColor] = useState("#5D5DFF");
  const [editedButtonTextColor, setEditedButtonTextColor] = useState("#ffffff");
  const [editedBackgroundColor, setEditedBackgroundColor] = useState("#ffffff");
  const [editedFontColor, setEditedFontColor] = useState("#000000");
  const [editedDisplayType, setEditedDisplayType] = useState("text-video");
  const [editedDisplayStyle, setEditedDisplayStyle] = useState("list");
  const [editedCardStyle, setEditedCardStyle] = useState("solid");
  const [editedSelectedFormId, setEditedSelectedFormId] = useState<string>("");
  const [editedFont, setEditedFont] = useState("Inter");
  const [editedLogoDataUrl, setEditedLogoDataUrl] = useState<string>("");
  const [editedInstagram, setEditedInstagram] = useState("");
  const [editedYoutube, setEditedYoutube] = useState("");
  const [editedTiktok, setEditedTiktok] = useState("");
  const [editedTwitter, setEditedTwitter] = useState("");
  const [editedFacebook, setEditedFacebook] = useState("");
  const [editedWhatsapp, setEditedWhatsapp] = useState("");
  const [editedTelegram, setEditedTelegram] = useState("");
  const [editedThreads, setEditedThreads] = useState("");
  const [editedSnapchat, setEditedSnapchat] = useState("");
  const [editedStarColor, setEditedStarColor] = useState("#facc15");
  const [editedMaxReviews, setEditedMaxReviews] = useState(0);
  const [editedColumns, setEditedColumns] = useState(3);

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

  const handleEditForm = (form: any) => {
    setEditingFormId(form.id);
    setEditedFormName(form.name);
    setIsEditFormOpen(true);
  };

  const handleSaveFormName = () => {
    if (!editedFormName.trim()) {
      toast({
        title: "Error",
        description: "Form name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const existingForms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
    const updatedForms = existingForms.map((f: any) =>
      f.id === editingFormId ? { ...f, name: editedFormName } : f
    );
    localStorage.setItem('hype_forms', JSON.stringify(updatedForms));
    setForms(updatedForms);
    
    toast({
      title: "Success",
      description: "Form name updated successfully",
    });
    
    setIsEditFormOpen(false);
    setEditingFormId(null);
    setEditedFormName("");
  };

  const handleDeleteForm = (formId: string) => {
    const existingForms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
    const updatedForms = existingForms.filter((f: any) => f.id !== formId);
    localStorage.setItem('hype_forms', JSON.stringify(updatedForms));
    setForms(updatedForms);
    
    toast({
      title: "Success",
      description: "Form deleted successfully",
    });
    
    setFormToDelete(null);
  };

  const handleDeletePage = (pageSlug: string) => {
    const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
    const updatedPages = pages.filter((p: any) => p.slug !== pageSlug);
    localStorage.setItem('hype_review_pages', JSON.stringify(updatedPages));
    setReviewPages(updatedPages);
    
    // Also delete associated forms
    const existingForms = JSON.parse(localStorage.getItem('hype_forms') || '[]');
    const updatedForms = existingForms.filter((f: any) => f.reviewsPage !== pageSlug);
    localStorage.setItem('hype_forms', JSON.stringify(updatedForms));
    setForms(updatedForms);
    
    toast({
      title: "Success",
      description: "Review page deleted successfully",
    });
    
    setPageToDelete(null);
    window.dispatchEvent(new Event('reviewPagesUpdated'));
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditedSpaceName(page.name);
                              setEditedHeaderTitle(page.headerTitle || "");
                              setEditedCustomMessage(page.customMessage || "");
                              setEditedCollectStarRatings(page.collectStarRatings ?? true);
                              setEditedLogoDataUrl(page.logo || "");
                              setEditedButtonColor(page.buttonColor || "#5D5DFF");
                              setEditedButtonTextColor(page.buttonTextColor || "#ffffff");
                              setEditedBackgroundColor(page.backgroundColor || "#ffffff");
                              setEditedFontColor(page.fontColor || "#000000");
                              setEditedSelectedFormId(page.collectionFormId || "none");
                              setEditedInstagram(page.instagram || "");
                              setEditedYoutube(page.youtube || "");
                              setEditedTiktok(page.tiktok || "");
                              setEditedTwitter(page.twitter || "");
                              setEditedFacebook(page.facebook || "");
                              setEditedWhatsapp(page.whatsapp || "");
                              setEditedTelegram(page.telegram || "");
                              setEditedThreads(page.threads || "");
                              setEditedSnapchat(page.snapchat || "");
                              setEditedDisplayType(page.displayType || "text-video");
                              setEditedDisplayStyle(page.displayStyle || "list");
                              setEditedCardStyle(page.cardStyle || "solid");
                              setEditedFont(page.font || "Inter");
                              setEditedStarColor(page.starColor || "#facc15");
                              setEditedMaxReviews(page.maxReviews || 0);
                              setEditedColumns(page.columns || 3);
                              setEditingPageId(page.id);
                              setIsEditPageOpen(true);
                            }}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Edit page
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setPageToDelete(page.slug)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                          <Link to={`/reviews/${page.slug}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Page
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
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditForm(form)}
                              >
                                <Pencil className="w-4 h-4 mr-2" />
                                Rename
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setFormToDelete(form.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                              <Link to={`/form/${form.id}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Form
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Form Name Dialog */}
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Rename Collection Form</DialogTitle>
              <DialogDescription>
                Update the name of your collection form
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="form-name">Form Name</Label>
                <Input
                  id="form-name"
                  value={editedFormName}
                  onChange={(e) => setEditedFormName(e.target.value)}
                  placeholder="My Collection Form"
                  className="rounded-lg"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditFormOpen(false);
                    setEditingFormId(null);
                    setEditedFormName("");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveFormName}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Page Dialog */}
        <Dialog open={isEditPageOpen} onOpenChange={setIsEditPageOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">Edit Review Page</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Update your review page settings and review collection preferences.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Space name */}
              <div className="space-y-2">
                <Label htmlFor="editSpaceName">
                  Review page name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="editSpaceName"
                  value={editedSpaceName}
                  onChange={(e) => setEditedSpaceName(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              {/* Space logo */}
              <div className="space-y-2">
                <Label htmlFor="edit-logo-upload">Logo</Label>
                <div className="flex items-center gap-4">
                  {editedLogoDataUrl ? (
                    <img 
                      src={editedLogoDataUrl} 
                      alt="Logo preview" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
                      <ThumbsUp className="w-8 h-8 text-primary-foreground" />
                    </div>
                  )}
                  <input
                    id="edit-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditedLogoDataUrl(reader.result as string);
                          toast({
                            title: "Logo updated",
                            description: `${file.name} has been uploaded successfully.`,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('edit-logo-upload')?.click()}
                  >
                    Change
                  </Button>
                </div>
              </div>

              {/* Header title */}
              <div className="space-y-2">
                <Label htmlFor="editHeaderTitle">
                  Header title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="editHeaderTitle"
                  placeholder="Would you like to give a shoutout for xyz?"
                  value={editedHeaderTitle}
                  onChange={(e) => setEditedHeaderTitle(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              {/* Custom message */}
              <div className="space-y-2">
                <Label htmlFor="editCustomMessage">
                  Your custom message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="editCustomMessage"
                  placeholder="Write a warm message to your customers, and give them simple directions on how to make the best review."
                  value={editedCustomMessage}
                  onChange={(e) => setEditedCustomMessage(e.target.value)}
                  className="rounded-lg min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">Markdown supported</p>
              </div>

              {/* Use collection form */}
              <div className="space-y-2">
                <Label htmlFor="editCollectionForm">Use collection form</Label>
                <Select value={editedSelectedFormId} onValueChange={setEditedSelectedFormId}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select a form (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {forms.map((form) => (
                      <SelectItem key={form.id} value={form.id}>
                        {form.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Settings Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display review type</Label>
                  <Select value={editedDisplayType} onValueChange={setEditedDisplayType}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="text-video">Text and Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Display Style</Label>
                  <Select value={editedDisplayStyle} onValueChange={setEditedDisplayStyle}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="wall">Wall of Love</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Card Style</Label>
                  <Select value={editedCardStyle} onValueChange={setEditedCardStyle}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Display star ratings</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={editedCollectStarRatings}
                      onCheckedChange={setEditedCollectStarRatings}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="starColor">Star Rating Color</Label>
                  <Input
                    id="starColor"
                    type="color"
                    value={editedStarColor}
                    onChange={(e) => setEditedStarColor(e.target.value)}
                    className="rounded-lg h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxReviews">Max Number of Reviews (0 = unlimited)</Label>
                  <Input
                    id="maxReviews"
                    type="number"
                    min="0"
                    value={editedMaxReviews}
                    onChange={(e) => setEditedMaxReviews(parseInt(e.target.value) || 0)}
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="columns">Number of Columns</Label>
                  <Select value={editedColumns.toString()} onValueChange={(val) => setEditedColumns(parseInt(val))}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Column</SelectItem>
                      <SelectItem value="2">2 Columns</SelectItem>
                      <SelectItem value="3">3 Columns</SelectItem>
                      <SelectItem value="4">4 Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={editedBackgroundColor}
                    onChange={(e) => setEditedBackgroundColor(e.target.value)}
                    className="w-20 h-10 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Font Color</Label>
                  <Input
                    type="color"
                    value={editedFontColor}
                    onChange={(e) => setEditedFontColor(e.target.value)}
                    className="w-20 h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Custom button color */}
              <div className="space-y-2">
                <Label>Custom button color 🎨</Label>
                <Input
                  type="color"
                  value={editedButtonColor}
                  onChange={(e) => setEditedButtonColor(e.target.value)}
                  className="w-20 h-10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Button text color */}
              <div className="space-y-2">
                <Label>Button text color</Label>
                <Input
                  type="color"
                  value={editedButtonTextColor}
                  onChange={(e) => setEditedButtonTextColor(e.target.value)}
                  className="w-20 h-10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Font Selection */}
              <div className="space-y-2">
                <Label>Page Font</Label>
                <Select value={editedFont} onValueChange={setEditedFont}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="Inter">Inter (Default)</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                    <SelectItem value="Merriweather">Merriweather</SelectItem>
                    <SelectItem value="Raleway">Raleway</SelectItem>
                    <SelectItem value="Ubuntu">Ubuntu</SelectItem>
                    <SelectItem value="Nunito">Nunito</SelectItem>
                    <SelectItem value="PT Sans">PT Sans</SelectItem>
                    <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                    <SelectItem value="Quicksand">Quicksand</SelectItem>
                    <SelectItem value="Karla">Karla</SelectItem>
                    <SelectItem value="Cabin">Cabin</SelectItem>
                    <SelectItem value="Work Sans">Work Sans</SelectItem>
                    <SelectItem value="Oxygen">Oxygen</SelectItem>
                    <SelectItem value="Josefin Sans">Josefin Sans</SelectItem>
                    <SelectItem value="Lora">Lora</SelectItem>
                    <SelectItem value="Crimson Text">Crimson Text</SelectItem>
                    <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                    <SelectItem value="Pacifico">Pacifico</SelectItem>
                    <SelectItem value="Bebas Neue">Bebas Neue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Social Media Handles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media Handles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="@username or full URL"
                      value={editedInstagram}
                      onChange={(e) => setEditedInstagram(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="flex items-center gap-2">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      placeholder="@username or full URL"
                      value={editedYoutube}
                      onChange={(e) => setEditedYoutube(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tiktok" className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      TikTok
                    </Label>
                    <Input
                      id="tiktok"
                      placeholder="@username or full URL"
                      value={editedTiktok}
                      onChange={(e) => setEditedTiktok(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      X (Twitter)
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="@username or full URL"
                      value={editedTwitter}
                      onChange={(e) => setEditedTwitter(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      placeholder="Username or full URL"
                      value={editedFacebook}
                      onChange={(e) => setEditedFacebook(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      placeholder="Phone number"
                      value={editedWhatsapp}
                      onChange={(e) => setEditedWhatsapp(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram" className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Telegram
                    </Label>
                    <Input
                      id="telegram"
                      placeholder="@username or full URL"
                      value={editedTelegram}
                      onChange={(e) => setEditedTelegram(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="threads" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Threads
                    </Label>
                    <Input
                      id="threads"
                      placeholder="@username or full URL"
                      value={editedThreads}
                      onChange={(e) => setEditedThreads(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="snapchat" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Snapchat
                    </Label>
                    <Input
                      id="snapchat"
                      placeholder="Username or full URL"
                      value={editedSnapchat}
                      onChange={(e) => setEditedSnapchat(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Save button */}
              <Button 
                className="w-full rounded-lg py-6 text-base" 
                size="lg"
                onClick={() => {
                  if (!editingPageId) {
                    setIsEditPageOpen(false);
                    return;
                  }
                  const pages = JSON.parse(localStorage.getItem('hype_review_pages') || '[]');
                  const updated = pages.map((p: any) =>
                    p.id === editingPageId
                      ? {
                          ...p,
                          name: editedSpaceName,
                          headerTitle: editedHeaderTitle,
                          customMessage: editedCustomMessage,
                          collectStarRatings: editedCollectStarRatings,
                          logo: editedLogoDataUrl || p.logo || "",
                          buttonColor: editedButtonColor,
                          buttonTextColor: editedButtonTextColor,
                          backgroundColor: editedBackgroundColor,
                          fontColor: editedFontColor,
                          displayType: editedDisplayType,
                          displayStyle: editedDisplayStyle,
                          cardStyle: editedCardStyle,
                          font: editedFont,
                          collectionFormId: editedSelectedFormId === "none" ? "" : editedSelectedFormId,
                          instagram: editedInstagram,
                          youtube: editedYoutube,
                          tiktok: editedTiktok,
                          twitter: editedTwitter,
                          facebook: editedFacebook,
                          whatsapp: editedWhatsapp,
                          telegram: editedTelegram,
                          threads: editedThreads,
                          snapchat: editedSnapchat,
                          starColor: editedStarColor,
                          maxReviews: editedMaxReviews,
                          columns: editedColumns,
                        }
                      : p
                  );
                  localStorage.setItem('hype_review_pages', JSON.stringify(updated));
                  window.dispatchEvent(new Event('reviewPagesUpdated'));
                  toast({
                    title: "Success",
                    description: "Review page settings updated successfully",
                  });
                  setIsEditPageOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Form Confirmation Dialog */}
        <AlertDialog open={!!formToDelete} onOpenChange={() => setFormToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Collection Form?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the collection form and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => formToDelete && handleDeleteForm(formToDelete)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Page Confirmation Dialog */}
        <AlertDialog open={!!pageToDelete} onOpenChange={() => setPageToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Review Page?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the review page and all associated forms and data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => pageToDelete && handleDeletePage(pageToDelete)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default ManageReviews;
