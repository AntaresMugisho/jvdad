import { useState } from "react";
import { BlogPost } from "@/lib/blog-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BlogEditor } from "./blog-editor";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function BlogForm({ post, onSubmit, onCancel }: BlogFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState(post?.content || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, "#" + tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      excerpt,
      coverImage,
      tags,
      content,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {post ? "Modifier l'article" : "Nouvel article"}
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cover">Image de couverture</Label>
            <div className="mt-2">
              {coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <img
                    src={coverImage}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setCoverImage("")}
                    data-testid="button-remove-cover"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="cover"
                  className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-lg cursor-pointer hover-elevate"
                >
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Cliquez pour télécharger une image. (Taille maximale: 2MB)
                  </span>
                  <input
                    id="cover"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    data-testid="input-cover-image"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Le titre de votre article"
              required
              className="text-2xl font-semibold"
              data-testid="input-title"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Extrait *</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Un court résumé de votre article"
              rows={3}
              required
              data-testid="input-excerpt"
            />
          </div>

          <div>
            <Label htmlFor="tags">Étiquettes</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Ajouter une étiquette"
                data-testid="input-tag"
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                data-testid="button-add-tag"
              >
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1"
                  data-testid={`badge-tag-${tag}`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1"
                    data-testid={`button-remove-tag-${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Label className="mb-4 block">Contenu *</Label>
        <BlogEditor data={content} onChange={setContent} />
      </Card>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-testid="button-cancel"
        >
          Annuler
        </Button>
        <Button type="submit" data-testid="button-submit">
          {post ? "Mettre à jour" : "Publier"}
        </Button>
      </div>
    </form>
  );
}
