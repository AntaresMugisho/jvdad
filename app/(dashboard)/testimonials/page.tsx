"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Quote, User, Upload, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/lib/types/testimonial";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({
        name: "",
        role: "",
        organization: "",
        content: "",
        avatar: "",
    });

    const { toast } = useToast();

    useEffect(() => {
        const saved = localStorage.getItem("jvdad-testimonials");
        if (saved) {
            setTestimonials(JSON.parse(saved));
        } else {
            // Default placeholder if none exist
            const defaultTestimonials: Testimonial[] = [
                {
                    id: "1",
                    name: "Marie K.",
                    role: "Agricultrice",
                    content: "JVDAD a transformé notre façon de cultiver. Nos récoltes ont doublé!",
                    avatar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
                }
            ];
            setTestimonials(defaultTestimonials);
            localStorage.setItem("jvdad-testimonials", JSON.stringify(defaultTestimonials));
        }
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        let newTestimonials;
        if (editingId) {
            newTestimonials = testimonials.map((t) =>
                t.id === editingId ? { ...(formData as Testimonial), id: editingId } : t
            );
            toast({ title: "Témoignage mis à jour" });
        } else {
            const newTestimonial = {
                ...(formData as Testimonial),
                id: Math.random().toString(36).substr(2, 9),
            };
            newTestimonials = [...testimonials, newTestimonial];
            toast({ title: "Témoignage ajouté" });
        }

        setTestimonials(newTestimonials);
        localStorage.setItem("jvdad-testimonials", JSON.stringify(newTestimonials));
        resetForm();
    };

    const resetForm = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: "", role: "", organization: "", content: "", avatar: "" });
    };

    const handleEdit = (testimonial: Testimonial) => {
        setFormData(testimonial);
        setEditingId(testimonial.id);
        setIsAdding(true);
    };

    const handleDelete = (id: string) => {
        const newTestimonials = testimonials.filter((t) => t.id !== id);
        setTestimonials(newTestimonials);
        localStorage.setItem("jvdad-testimonials", JSON.stringify(newTestimonials));
        toast({ title: "Témoignage supprimé" });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold">Témoignages</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez les retours d'expérience et témoignages clients
                    </p>
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Ajouter un témoignage
                    </Button>
                )}
            </div>

            {isAdding ? (
                <Card className="p-6">
                    <form onSubmit={handleSave} className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            {editingId ? "Modifier le témoignage" : "Nouveau témoignage"}
                        </h2>

                        <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={formData.avatar} />
                                <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <Label htmlFor="avatar-upload" className="cursor-pointer text-primary hover:underline flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Choisir une photo
                                </Label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <p className="text-xs text-muted-foreground">Format recommandé : Carré, min. 200x200px</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom complet *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Marie Kabulo"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Titre / Profession *</Label>
                                <Input
                                    id="role"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="Ex: Agricultrice"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="organization">Organisation (facultatif)</Label>
                                <Input
                                    id="organization"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    placeholder="Ex: Coopérative des maraîchers"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="content">Contenu du témoignage *</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Partagez l'expérience de cette personne avec JVDAD..."
                                    rows={5}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="secondary" onClick={resetForm}>
                                Annuler
                            </Button>
                            <Button type="submit">
                                {editingId ? "Enregistrer les modifications" : "Publier le témoignage"}
                            </Button>
                        </div>
                    </form>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                        <Card key={t.id} className="p-6 relative group border-l-4 border-l-primary/30 hover:border-l-primary transition-all">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-14 w-14 border-2 border-primary/10">
                                    <AvatarImage src={t.avatar} />
                                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{t.name}</h3>
                                    <p className="text-sm text-primary font-medium">{t.role}</p>
                                    {t.organization && <p className="text-xs text-muted-foreground">{t.organization}</p>}
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary p-0"
                                        onClick={() => handleEdit(t)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive p-0"
                                        onClick={() => handleDelete(t.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t italic text-slate-700 relative">
                                <Quote className="h-6 w-6 text-primary/5 absolute -top-1 -right-1" />
                                "{t.content}"
                            </div>
                        </Card>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="col-span-full py-16 text-center border-2 border-dashed rounded-xl">
                            <Quote className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">Aucun témoignage disponible.</p>
                            <Button variant="ghost" onClick={() => setIsAdding(true)}>
                                Commencez par en ajouter un
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
