"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { galleryApi } from "@/lib/api";
import { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Edit,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

const initialForm: Omit<GalleryImage, "id"> & { file?: File | null } = {
  src: "",
  description: "",
  file: null,
};

type GalleryFormData = typeof initialForm;

type GalleryView = "grid" | "table";

type GallerySortKey = "created_at" | "description" | "category";

interface GalleryItem extends GalleryImage {
  created_at?: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<GalleryView>("grid");
  const [sortKey, setSortKey] = useState<GallerySortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GalleryFormData>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await galleryApi.list();
      setImages(data);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          error?.message || "Impossible de récupérer la galerie pour le moment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ ...initialForm });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setEditingId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({ src: item.src ?? "", description: item.description ?? "" });
    setPreviewUrl(item.src ?? null);
    setShowForm(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setForm((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const hasFile = !!form.file;
      let payload: FormData | Record<string, any>;

      if (hasFile && form.file) {
        const formData = new FormData();
        formData.append("src", form.file);
        payload = formData;
      } else {
        payload = {};
      }

      const normalizedDescription = form.description?.trim();

      if (hasFile) {
        const formData = payload as FormData;
        if (form.file) formData.append("src", form.file);
        if (normalizedDescription) formData.append("description", normalizedDescription);
      } else {
        const jsonPayload = payload as Record<string, any>;
        if (normalizedDescription) jsonPayload.description = normalizedDescription;
      }

      const config = hasFile
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined;

      if (editingId) {
        await galleryApi.update(editingId, payload, config);
        toast({ title: "Image mise à jour" });
      } else {
        await galleryApi.create(payload, config);
        toast({ title: "Image ajoutée" });
      }

      await fetchImages();
      setShowForm(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      await galleryApi.delete(deleteId);
      toast({ title: "Image supprimée" });
      await fetchImages();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de supprimer cette image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const sortedImages = useMemo(() => {
    const cloned = [...images];
    cloned.sort((a, b) => {
      const valueA = (a[sortKey] ?? "").toString().toLowerCase();
      const valueB = (b[sortKey] ?? "").toString().toLowerCase();

      if (valueA < valueB) return sortAsc ? -1 : 1;
      if (valueA > valueB) return sortAsc ? 1 : -1;
      return 0;
    });

    return cloned;
  }, [images, sortAsc, sortKey]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Galerie</h1>
          <p className="text-muted-foreground mt-1">
            Ajoutez, classez et gérez les images de votre galerie.
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
            <PopoverContent className="w-48">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Champ</Label>
                {["created_at", "description", "category"].map((key) => (
                  <Button
                    key={key}
                    variant={sortKey === key ? "primary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setSortKey(key as GallerySortKey);
                      setSortAsc(false);
                    }}
                  >
                    {key === "created_at" ? "Date d'ajout" : key === "description" ? "Description" : "Catégorie"}
                  </Button>
                ))}
                <Separator />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => setSortAsc((prev) => !prev)}
                >
                  {sortAsc ? "Ordre croissant" : "Ordre décroissant"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="rounded-md border p-1 flex">
            {(["grid", "table"] as GalleryView[]).map((mode) => (
              <Button
                key={mode}
                variant={view === mode ? "primary" : "ghost"}
                size="sm"
                className={cn("px-3", view === mode ? "shadow" : "")}
                onClick={() => setView(mode)}
              >
                {mode === "grid" ? "Grille" : "Table"}
              </Button>
            ))}
          </div>
          <Button className="gap-2" onClick={openCreateForm}>
            <Plus className="h-4 w-4" />
            Ajouter une image
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedImages.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video relative">
                {item.src ? (
                  <Image src={item.src} alt={item.description} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <CardHeader className="space-y-1 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <p className="font-medium text-base line-clamp-2">{item.description || "Sans description"}</p>
                    <Badge variant="outline">Image</Badge> {/* Catégorie */}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 [&_svg]:h-4 [&_svg]:w-4"
                    onClick={() => openEditForm(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardFooter className="flex items-center justify-between border-t px-6 py-3 text-xs text-muted-foreground">
                <span>
                  {item.created_at
                    ? format(new Date(item.created_at), "dd MMM yyyy")
                    : "Date inconnue"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 text-destructive [&_svg]:h-4 [&_svg]:w-4"
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {!loading && sortedImages.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center text-muted-foreground">
              <ImageIcon className="mb-3 h-10 w-10" />
              <p className="mb-4 text-base">La galerie est vide pour le moment.</p>
              <Button onClick={openCreateForm}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter votre première image
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Liste des images</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <th className="p-3">Aperçu</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Catégorie</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedImages.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-md border bg-muted">
                        {item.src ? (
                          <Image src={item.src} description={item.description} width={96} height={64} className="object-cover" />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{item.description || "Sans description"}</div>
                      {item.src && (
                        <div className="mt-1 truncate text-xs text-muted-foreground">{item.src}</div>
                      )}
                    </td>
                    <td className="p-3">
                      {true ? (
                        <Badge variant="secondary">Image</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {item.created_at
                        ? format(new Date(item.created_at), "dd MMM yyyy")
                        : "—"}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8"
                          onClick={() => openEditForm(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 text-destructive"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && sortedImages.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
                <p>Aucune image enregistrée.</p>
                <Button variant="primary" onClick={openCreateForm}>
                  <Plus className="mr-2 h-4 w-4" /> Ajouter une image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={(open) => !open && setShowForm(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier l'image" : "Nouvelle image"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="image-upload">Image</Label>
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 text-center">
                {previewUrl ? (
                  <div className="relative h-40 w-full overflow-hidden rounded-lg border">
                    <Image src={previewUrl} description="Aperçu" fill className="object-cover" />
                  </div>
                ) : (
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                )}
                <div className="space-y-2">
                  <Label
                    htmlFor="image-upload"
                    className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Upload className="h-4 w-4" />
                    Sélectionner une image
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    Formats supportés: JPG, PNG. Taille max: 2 Mo
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Culture de maïs à Nyankunde"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {editingId ? "Enregistrer les modifications" : "Ajouter à la galerie"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette image ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'image sera définitivement retirée de votre galerie.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
