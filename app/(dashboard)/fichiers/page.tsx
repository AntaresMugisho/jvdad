"use client";

import { useState } from "react";
import { fileStorage, FileItem } from "@/lib/file-storage";
import { FileGrid } from "@/components/file-grid";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderPlus, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FileManager() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [items, setItems] = useState(fileStorage.getItems());
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showRename, setShowRename] = useState<string | null>(null);
  const [folderName, setFolderName] = useState("");
  const [renameName, setRenameName] = useState("");
  const { toast } = useToast();

  const currentItems = items.filter((item) => item.parentId === currentFolder);

  const getBreadcrumbs = (): FileItem[] => {
    const breadcrumbs: FileItem[] = [];
    let folderId = currentFolder;

    while (folderId) {
      const folder = items.find((item) => item.id === folderId);
      if (folder) {
        breadcrumbs.unshift(folder);
        folderId = folder.parentId;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      setCurrentFolder(item.id);
    }
  };

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      await fileStorage.uploadFile(file, currentFolder);
    }
    setItems(fileStorage.getItems());
    toast({ title: `${files.length} fichier(s) téléchargé(s)` });
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      fileStorage.createFolder(folderName, currentFolder);
      setItems(fileStorage.getItems());
      setFolderName("");
      setShowNewFolder(false);
      toast({ title: "Dossier créé" });
    }
  };

  const handleRename = () => {
    if (showRename && renameName.trim()) {
      fileStorage.renameItem(showRename, renameName);
      setItems(fileStorage.getItems());
      setRenameName("");
      setShowRename(null);
      toast({ title: "Renommé avec succès" });
    }
  };

  const handleDelete = (id: string) => {
    fileStorage.deleteItem(id);
    setItems(fileStorage.getItems());
    toast({ title: "Supprimé" });
  };

  const handleRenameClick = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setRenameName(item.name);
      setShowRename(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Fichiers</h1>
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={() => setCurrentFolder(null)}
                  className="flex items-center gap-1"
                  data-testid="link-home"
                >
                  <Home className="h-3 w-3" />
                  Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              {getBreadcrumbs().map((folder, idx) => (
                <div key={folder.id} className="flex items-center gap-2">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="#"
                      onClick={() => setCurrentFolder(folder.id)}
                      data-testid={`link-breadcrumb-${folder.id}`}
                    >
                      {folder.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button onClick={() => setShowNewFolder(true)} data-testid="button-new-folder">
          <FolderPlus className="h-4 w-4 mr-2" />
          Nouveau dossier
        </Button>
      </div>

      <UploadZone onUpload={handleUpload} />

      {currentItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ce dossier est vide</p>
        </div>
      ) : (
        <FileGrid
          items={currentItems}
          onItemClick={handleItemClick}
          onDelete={handleDelete}
          onRename={handleRenameClick}
        />
      )}

      <Dialog open={showNewFolder} onOpenChange={setShowNewFolder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau dossier</DialogTitle>
          </DialogHeader>
          <Input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nom du dossier"
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            data-testid="input-folder-name"
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowNewFolder(false)} data-testid="button-cancel-folder">
              Annuler
            </Button>
            <Button onClick={handleCreateFolder} data-testid="button-create-folder">
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showRename} onOpenChange={() => setShowRename(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renommer</DialogTitle>
          </DialogHeader>
          <Input
            value={renameName}
            onChange={(e) => setRenameName(e.target.value)}
            placeholder="Nouveau nom"
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            data-testid="input-rename"
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowRename(null)} data-testid="button-cancel-rename">
              Annuler
            </Button>
            <Button onClick={handleRename} data-testid="button-confirm-rename">
              Renommer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
