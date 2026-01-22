"use client";

import { Card } from "@/components/ui/card";
import { FileText, FolderOpen, TrendingUp } from "lucide-react";
import { blogStorage } from "@/lib/blog-storage";
import { fileStorage } from "@/lib/file-storage";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    setPosts(blogStorage.getPosts());
    setFiles(fileStorage.getItems());
  }, []);

  const stats = [
    {
      label: "Articles",
      value: posts.length,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Fichiers",
      value: files.length,
      icon: FolderOpen,
      color: "text-green-500",
    },
    {
      label: "Total",
      value: posts.length + files.length,
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans votre espace de gestion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-semibold mt-2" data-testid={`text-stat-${stat.label.toLowerCase()}`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-12 w-12 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Articles récents</h2>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun article publié</p>
          ) : (
            <div className="space-y-3">
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 p-3 rounded-md hover-elevate"
                >
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fichiers récents</h2>
          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun fichier ajouté</p>
          ) : (
            <div className="space-y-3">
              {files.slice(0, 5).map((file) => (
                <div
                  key={file.id}
                  className="flex items-start gap-3 p-3 rounded-md hover-elevate"
                >
                  <FolderOpen className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.type === "folder" ? "Dossier" : "Fichier"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
