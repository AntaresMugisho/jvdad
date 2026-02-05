"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { testimonialsApi } from "@/lib/api";
import { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpDown, Edit, Plus, Quote, Trash2, Upload, User, X } from "lucide-react";

type TestimonialFormState = {
  author_name: string;
  author_role: string;
  author_organisation: string;
  content: string;
  author_image: string;
  file: File | null;
};

const emptyForm: TestimonialFormState = {
  author_name: "",
  author_role: "",
  author_organisation: "",
  content: "",
  author_image: "",
  file: null,
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialFormState>({ ...emptyForm });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await testimonialsApi.list();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de récupérer les témoignages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const mapLegacyFields = (testimonial: Testimonial) => ({
    author_name: testimonial.author_name ?? (testimonial as any).name ?? "",
    author_role: testimonial.author_role ?? (testimonial as any).role ?? "",
    author_organisation:
      testimonial.author_organisation ?? (testimonial as any).organization ?? "",
    author_image: testimonial.author_image ?? (testimonial as any).avatar ?? "",
  });

  const openEditForm = (testimonial: Testimonial) => {
    const mapped = mapLegacyFields(testimonial);
    setEditingId(testimonial.id);
    setForm({ ...emptyForm, ...mapped, content: testimonial.content ?? "" });
    setPreviewUrl(mapped.author_image || null);
    setShowForm(true);
  };

  const handleFieldChange = (key: keyof TestimonialFormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    handleFieldChange("file", file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.author_name.trim();
    const role = form.author_role.trim();
    const content = form.content.trim();

    if (!name || !role || !content) {
      toast({
        title: "Champs requis",
        description: "Veuillez renseigner le nom, le rôle et le contenu du témoignage.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const hasFile = !!form.file;
      let payload: FormData | Record<string, any>;

      if (hasFile && form.file) {
        const data = new FormData();
        data.append("author_image", form.file);
        data.append("author_name", name);
        data.append("author_role", role);
        data.append("content", content);
        if (form.author_organisation.trim()) {
          data.append("author_organisation", form.author_organisation.trim());
        }
        // if (form.author_image.trim()) {
        //   data.append("author_image", form.author_image.trim());
        // }
        payload = data;
      } else {
        payload = {
          author_name: name,
          author_role: role,
          content,
        } as Record<string, any>;

        if (form.author_organisation.trim()) {
          payload.author_organisation = form.author_organisation.trim();
        }
        // if (form.author_image.trim()) {
        //   payload.author_image = form.author_image.trim();
        // }
      }

      const config = form.file
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined;

      if (editingId) {
        await testimonialsApi.update(editingId, payload, config);
        toast({ title: "Témoignage mis à jour" });
      } else {
        await testimonialsApi.create(payload, config);
        toast({ title: "Témoignage ajouté" });
      }

      setShowForm(false);
      resetForm();
      await fetchTestimonials();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible d'enregistrer le témoignage",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setSubmitting(true);
    try {
      await testimonialsApi.delete(deleteId);
      toast({ title: "Témoignage supprimé" });
      await fetchTestimonials();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de supprimer ce témoignage",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setDeleteId(null);
    }
  };

  const sortedTestimonials = useMemo(() => {
    const cloned = [...testimonials];
    cloned.sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortAsc ? aDate - bDate : bDate - aDate;
    });
    return cloned;
  }, [sortAsc, testimonials]);

  const imagePreview = previewUrl ?? (form.file ? previewUrl : form.author_image);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Témoignages</h1>
          <p className="text-muted-foreground mt-1">
            Recueillez et mettez à jour les retours d'expérience de vos bénéficiaires.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="sm" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Trier
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ordre</Label>
                <Button
                  variant={sortAsc ? "ghost" : "primary"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSortAsc(false)}
                >
                  Plus récent
                </Button>
                <Button
                  variant={sortAsc ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSortAsc(true)}
                >
                  Plus ancien
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button className="gap-2" onClick={openCreateForm}>
            <Plus className="h-4 w-4" />
            Ajouter un témoignage
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedTestimonials.map((testimonial) => {
          const mapped = mapLegacyFields(testimonial);

          return (
            <Card
              key={testimonial.id}
              className="p-6 border-l-4 border-l-primary/30 hover:border-l-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/10">
                  <AvatarImage src={mapped.author_image} />
                  <AvatarFallback>{mapped.author_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{mapped.author_name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{mapped.author_role}</p>
                  {mapped.author_organisation && (
                    <p className="text-xs text-muted-foreground">{mapped.author_organisation}</p>
                  )}
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p className="italic">"{testimonial.content}"</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => openEditForm(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteId(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="mt-4 px-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Créé le {testimonial.created_at ? format(new Date(testimonial.created_at), "dd MMM yyyy") : "—"}
                  </span>
                  {testimonial.updated_at && (
                    <Badge variant="outline">Mis à jour le {format(new Date(testimonial.updated_at), "dd MMM yyyy")}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {!loading && sortedTestimonials.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-16 text-center space-y-4">
              <Quote className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <div className="space-y-1">
                <CardTitle>Aucun témoignage</CardTitle>
                <p className="text-muted-foreground">Commencez par en ajouter un pour alimenter votre site.</p>
              </div>
              <Button onClick={openCreateForm}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter votre premier témoignage
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={(open) => !open && setShowForm(false)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier le témoignage" : "Nouveau témoignage"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={imagePreview || undefined} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="testimonial-upload" className="cursor-pointer text-primary flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Choisir un fichier
                </Label>
                <input
                  id="testimonial-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground">Formats acceptés: JPG, PNG. Taille max: 2 Mo.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author_name">Nom complet *</Label>
                <Input
                  id="author_name"
                  value={form.author_name}
                  onChange={(event) => handleFieldChange("author_name", event.target.value)}
                  placeholder="Ex: Marie Kabulo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author_role">Titre / Profession *</Label>
                <Input
                  id="author_role"
                  value={form.author_role}
                  onChange={(event) => handleFieldChange("author_role", event.target.value)}
                  placeholder="Ex: Agricultrice"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="author_organisation">Organisation</Label>
                <Input
                  id="author_organisation"
                  value={form.author_organisation}
                  onChange={(event) => handleFieldChange("author_organisation", event.target.value)}
                  placeholder="Ex: Coopérative des maraîchers"
                />
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="content">Contenu *</Label>
              <Textarea
                id="content"
                rows={5}
                value={form.content}
                onChange={(event) => handleFieldChange("content", event.target.value)}
                placeholder="Partagez l'expérience de cette personne avec JVDAD..."
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={submitting}>
                {editingId ? "Enregistrer" : "Publier"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce témoignage ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le témoignage sera supprimé définitivement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={submitting}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
