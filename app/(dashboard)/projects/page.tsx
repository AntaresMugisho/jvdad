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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { projectsApi } from "@/lib/api";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Check,
  Edit,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const emptyProject: Project & { file?: File | null; expected_input?: string; budget_input?: string } = {
  id: "",
  name: "",
  description: "",
  objective: "",
  location: "",
  image: "",
  expected_results: [],
  status: "",
  budget: undefined,
  created_at: undefined,
  updated_at: undefined,
  file: null,
  expected_input: "",
  budget_input: "",
};

type ProjectFormState = typeof emptyProject;

type ProjectView = "grid" | "table";

type ProjectSortKey = "created_at" | "name" | "status";

const statusOptions = [
  { value: "planning", label: "Planification" },
  { value: "in_progress", label: "En cours" },
  { value: "completed", label: "Terminé" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<ProjectView>("grid");
  const [sortKey, setSortKey] = useState<ProjectSortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectFormState>({ ...emptyProject });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsApi.list();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de charger les projets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ ...emptyProject });
    setEditingId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (project: Project) => {
    setEditingId(project.id);
    setForm({
      ...emptyProject,
      ...project,
      file: null,
      expected_input: "",
      budget_input: project.budget ? String(project.budget) : "",
    });
    setShowForm(true);
  };

  const handleFieldChange = (key: keyof ProjectFormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFieldChange("file", file);
  };

  const addExpectedResult = () => {
    const value = form.expected_input?.trim();
    if (!value) return;
    handleFieldChange("expected_results", [...(form.expected_results ?? []), value]);
    handleFieldChange("expected_input", "");
  };

  const removeExpectedResult = (index: number) => {
    const updated = [...(form.expected_results ?? [])];
    updated.splice(index, 1);
    handleFieldChange("expected_results", updated);
  };

  const preparePayload = () => {
    const hasFile = !!form.file;
    const normalized = {
      name: form.name?.trim() || "",
      description: form.description?.trim() || "",
      objective: form.objective?.trim() || "",
      location: form.location?.trim() || "",
      status: form.status?.trim() || undefined,
      image: form.image?.trim() || undefined,
      expected_results: form.expected_results?.filter(Boolean) ?? [],
      budget: form.budget_input?.trim()
        ? Number.parseFloat(form.budget_input.trim())
        : 0,
    };

    if (hasFile && form.file) {
      const payload = new FormData();
      payload.append("image", form.file);
      Object.entries(normalized).forEach(([key, value]) => {
        if (value === undefined || value === "") return;
        if (Array.isArray(value)) {
          payload.append(key, JSON.stringify(value));
        } else {
          payload.append(key, String(value));
        }
      });
      return { data: payload, config: { headers: { "Content-Type": "multipart/form-data" } } as const };
    }

    return { data: normalized } as const;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast({ title: "Le nom du projet est requis", variant: "destructive" });
      return;
    }

    if (!form.description.trim()) {
      toast({ title: "La description est requise", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { data, config } = preparePayload();

      if (editingId) {
        await projectsApi.update(editingId, data as any, config);
        toast({ title: "Projet mis à jour" });
      } else {
        await projectsApi.create(data as any, config);
        toast({ title: "Projet créé" });
      }

      setShowForm(false);
      resetForm();
      await refreshProjects();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible d'enregistrer le projet",
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
      await projectsApi.delete(deleteId);
      toast({ title: "Projet supprimé" });
      await refreshProjects();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de supprimer ce projet",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setDeleteId(null);
    }
  };

  const sortedProjects = useMemo(() => {
    const cloned = [...projects];
    cloned.sort((a, b) => {
      const valueA = (a[sortKey] ?? "").toString().toLowerCase();
      const valueB = (b[sortKey] ?? "").toString().toLowerCase();
      if (valueA < valueB) return sortAsc ? -1 : 1;
      if (valueA > valueB) return sortAsc ? 1 : -1;
      return 0;
    });
    return cloned;
  }, [projects, sortAsc, sortKey]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Projets</h1>
          <p className="text-muted-foreground mt-1">
            Créez, mettez à jour et suivez vos initiatives.
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
                {["created_at", "name", "status"].map((key) => (
                  <Button
                    key={key}
                    variant={sortKey === key ? "primary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setSortKey(key as ProjectSortKey);
                      setSortAsc(false);
                    }}
                  >
                    {key === "created_at"
                      ? "Date de création"
                      : key === "name"
                      ? "Nom"
                      : "Statut"}
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
            {(["grid", "table"] as ProjectView[]).map((mode) => (
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
            Nouveau projet
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
              <CardHeader className="flex-row items-start justify-between gap-4 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  {project.status && (
                    <Badge variant="outline" className="mt-2 capitalize">
                      {project.status.replace("_", " ")}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 [&_svg]:h-4 [&_svg]:w-4"
                  onClick={() => openEditForm(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs uppercase text-muted-foreground">Objectif</Label>
                  <p className="text-sm mt-1 line-clamp-3">{project.objective}</p>
                </div>
                <div>
                  <Label className="text-xs uppercase text-muted-foreground">Localisation</Label>
                  <p className="text-sm mt-1">{project.location}</p>
                </div>
                {project.expected_results?.length ? (
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground">Résultats attendus</Label>
                    <div className="flex flex-wrap gap-2">
                      {project.expected_results.map((item, index) => (
                        <Badge key={`${project.id}-result-${index}`} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t px-6 py-3">
                <span>
                  {project.created_at
                    ? format(new Date(project.created_at), "dd MMM yyyy")
                    : "Date inconnue"}
                </span>
                <div className="flex items-center gap-2">
                  {project.budget ? (
                    <Badge variant="outline">Budget: {project.budget.toLocaleString()} USD</Badge>
                  ) : null}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 text-destructive [&_svg]:h-4 [&_svg]:w-4"
                    onClick={() => setDeleteId(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          {!loading && sortedProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-lg py-16 text-muted-foreground">
              <ImageIcon className="h-10 w-10" />
              <p>Aucun projet enregistré.</p>
              <Button onClick={openCreateForm}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter votre premier projet
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Liste des projets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <th className="p-3">Nom</th>
                  <th className="p-3">Localisation</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Mise à jour</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => (
                  <tr key={project.id} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {project.description}
                      </div>
                    </td>
                    <td className="p-3">{project.location}</td>
                    <td className="p-3 capitalize">
                      {project.status ? project.status.replace("_", " ") : "—"}
                    </td>
                    <td className="p-3">
                      {project.budget ? `${project.budget.toLocaleString()} USD` : "—"}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {project.updated_at
                        ? format(new Date(project.updated_at), "dd MMM yyyy")
                        : "—"}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8"
                          onClick={() => openEditForm(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 text-destructive"
                          onClick={() => setDeleteId(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && sortedProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
                <p>Aucun projet enregistré.</p>
                <Button variant="primary" onClick={openCreateForm}>
                  <Plus className="mr-2 h-4 w-4" /> Ajouter un projet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={(open) => !open && setShowForm(false)}>
        <DialogContent className="max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(event) => handleFieldChange("name", event.target.value)}
                  placeholder="Ex: Programme d'agriculture durable"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full justify-between"
                    >
                      {form.status
                        ? statusOptions.find((option) => option.value === form.status)?.label ??
                          "Statut"
                        : "Sélectionner"}
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-1">
                      {statusOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={form.status === option.value ? "primary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => handleFieldChange("status", option.value)}
                        >
                          {option.label}
                          {form.status === option.value && <Check className="ml-auto h-4 w-4" />}
                        </Button>
                      ))}
                      <Separator />
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleFieldChange("status", "")}
                      >
                        <X className="h-4 w-4 mr-2" /> Effacer
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(event) => handleFieldChange("description", event.target.value)}
                  placeholder="Décrivez brièvement le projet"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="objective">Objectif principal *</Label>
                <Textarea
                  id="objective"
                  value={form.objective}
                  onChange={(event) => handleFieldChange("objective", event.target.value)}
                  placeholder="Quel est l'objectif principal ?"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(event) => handleFieldChange("location", event.target.value)}
                  placeholder="Ex: Territoire d'Irumu, Ituri"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget estimé</Label>
                <Input
                  id="budget"
                  type="number"
                  value={form.budget_input}
                  onChange={(event) => handleFieldChange("budget_input", event.target.value)}
                  placeholder="Ex: 15000"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Résultats attendus</Label>
              <div className="flex gap-2">
                <Input
                  value={form.expected_input}
                  onChange={(event) => handleFieldChange("expected_input", event.target.value)}
                  placeholder="Ajoutez un résultat mesurable"
                />
                <Button type="button" onClick={addExpectedResult}>
                  Ajouter
                </Button>
              </div>
              {form.expected_results?.length ? (
                <div className="flex flex-wrap gap-2">
                  {form.expected_results.map((item, index) => (
                    <Badge key={`expected-${index}`} variant="secondary" className="gap-1">
                      {item}
                      <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-destructive"
                        onClick={() => removeExpectedResult(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Téléverser une image</Label>
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="image-upload"
                    className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Upload className="h-4 w-4" />
                    Choisir un fichier
                  </Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  {form.file && <span className="text-xs text-muted-foreground">{form.file.name}</span>}
                </div>
                <p className="text-xs text-muted-foreground">
                  Formats acceptés: JPG, PNG. Taille max: 5 Mo.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={submitting}>
                {editingId ? "Enregistrer" : "Créer"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Les données du projet seront définitivement supprimées.
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
