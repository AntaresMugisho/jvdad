import { BlogPost } from "@/lib/blog-storage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";


interface BlogCardProps {
  post: BlogPost;
  viewMode: "grid" | "list";
  onEdit?: (post: BlogPost) => void;
  onDelete?: (id: string) => void;
}

export function BlogCard({ post, viewMode, onEdit, onDelete }: BlogCardProps) {
  if (viewMode === "grid") {
    return (
      <Card className="overflow-hidden hover-elevate  max-w-3xl">
        <div className="aspect-video relative">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Aucune image</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2" data-testid={`text-title-${post.id}`}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" data-testid={`badge-tag-${post.id}-${idx}`}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit?.(post)}
                data-testid={`button-edit-${post.id}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete?.(post.id)}
                data-testid={`button-delete-${post.id}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 hover-elevate">
      <div className="flex gap-4">
        <div className="w-32 h-32 flex-shrink-0">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Aucune image</span>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-lg" data-testid={`text-title-${post.id}`}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" data-testid={`badge-tag-${post.id}-${idx}`}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(post.createdAt).toLocaleDateString("fr-FR")}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit?.(post)}
            data-testid={`button-edit-${post.id}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete?.(post.id)}
            data-testid={`button-delete-${post.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
