import { FileItem } from "@/lib/file-storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Folder,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
  Download,
  Trash2,
  Edit,
} from "lucide-react";

interface FileGridProps {
  items: FileItem[];
  onItemClick: (item: FileItem) => void;
  onDelete: (id: string) => void;
  onRename: (id: string) => void;
}

function getFileIcon(mimeType?: string) {
  if (!mimeType) return File;
  if (mimeType.startsWith("image/")) return ImageIcon;
  if (mimeType.startsWith("video/")) return Video;
  if (mimeType.startsWith("audio/")) return Music;
  if (mimeType.includes("pdf")) return FileText;
  return File;
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} Ko`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} Mo`;
}

export function FileGrid({ items, onItemClick, onDelete, onRename }: FileGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {items.map((item) => {
        const Icon = item.type === "folder" ? Folder : getFileIcon(item.mimeType);

        return (
          <Card
            key={item.id}
            className="p-4 cursor-pointer hover-elevate"
            onClick={() => onItemClick(item)}
            data-testid={`card-file-${item.id}`}
          >
            <div className="flex flex-col items-center gap-3">
              <Icon className="h-12 w-12 text-muted-foreground" />
              <div className="text-center w-full">
                <p className="text-sm font-medium truncate" title={item.name}>
                  {item.name}
                </p>
                {item.size && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatFileSize(item.size)}
                  </p>
                )}
              </div>
              <div className="flex gap-1 w-full justify-center">
                {item.type === "file" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.data) {
                        const link = document.createElement("a");
                        link.href = item.data;
                        link.download = item.name;
                        link.click();
                      }
                    }}
                    data-testid={`button-download-${item.id}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRename(item.id);
                  }}
                  data-testid={`button-rename-${item.id}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  data-testid={`button-delete-${item.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
