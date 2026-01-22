import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
}

export function UploadZone({ onUpload }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-colors hover-elevate ${
        isDragActive ? "border-primary bg-primary/5" : ""
      }`}
      data-testid="upload-zone"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <p className="text-sm font-medium">
            {isDragActive
              ? "Déposez les fichiers ici"
              : "Glissez-déposez des fichiers ici"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ou cliquez pour sélectionner
          </p>
        </div>
      </div>
    </Card>
  );
}
