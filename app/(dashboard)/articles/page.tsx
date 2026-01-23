"use client";

import { useState } from "react";
import { blogStorage, BlogPost } from "@/lib/blog-storage";
import { BlogCard } from "@/components/blog-card";
import { BlogForm } from "@/components/blog-form";
import Button from "@/components/ui/Button";

import { Plus, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [posts, setPosts] = useState(blogStorage.getPosts());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleSubmit = (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
    if (editingPost) {
      blogStorage.updatePost(editingPost.id, data);
      toast({ title: "Article mis à jour avec succès" });
    } else {
      blogStorage.createPost(data);
      toast({ title: "Article publié avec succès" });
    }
    setPosts(blogStorage.getPosts());
    setShowForm(false);
    setEditingPost(undefined);
    setCurrentPage(1);
  };

  const handleDelete = () => {
    if (deletePostId) {
      blogStorage.deletePost(deletePostId);
      setPosts(blogStorage.getPosts());
      setDeletePostId(null);
      toast({ title: "Article supprimé" });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="space-y-6 max-w-3xl">
        <BlogForm
          post={editingPost}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Blog</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos articles de blog
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-accent" : ""}
            data-testid="button-view-grid"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-accent" : ""}
            data-testid="button-view-list"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowForm(true)} data-testid="button-new-post">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Aucun article publié</p>
          <Button onClick={() => setShowForm(true)} data-testid="button-create-first">
            <Plus className="h-4 w-4 mr-2" />
            Créer votre premier article
          </Button>
        </div>
      ) : (
        <>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {paginatedPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                viewMode={viewMode}
                onEdit={handleEdit}
                onDelete={setDeletePostId}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground" data-testid="text-page-info">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                data-testid="button-next-page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} data-testid="button-confirm-delete">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
