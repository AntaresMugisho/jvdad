export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  mimeType?: string;
  parentId: string | null;
  createdAt: string;
  data?: string;
}

const STORAGE_KEY = "asbl-files";

export const fileStorage = {
  getItems: (): FileItem[] => {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  },

  getItem: (id: string): FileItem | undefined => {
    const items = fileStorage.getItems();
    return items.find((item) => item.id === id);
  },

  getItemsByParent: (parentId: string | null): FileItem[] => {
    const items = fileStorage.getItems();
    return items.filter((item) => item.parentId === parentId);
  },

  createFolder: (name: string, parentId: string | null): FileItem => {
    const items = fileStorage.getItems();
    const newFolder: FileItem = {
      id: Date.now().toString(),
      name,
      type: "folder",
      parentId,
      createdAt: new Date().toISOString(),
    };
    items.push(newFolder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newFolder;
  },

  uploadFile: (file: File, parentId: string | null): Promise<FileItem> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const items = fileStorage.getItems();
        const newFile: FileItem = {
          id: Date.now().toString(),
          name: file.name,
          type: "file",
          size: file.size,
          mimeType: file.type,
          parentId,
          createdAt: new Date().toISOString(),
          data: reader.result as string,
        };
        items.push(newFile);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        resolve(newFile);
      };
      reader.readAsDataURL(file);
    });
  },

  deleteItem: (id: string): boolean => {
    const items = fileStorage.getItems();
    const item = items.find((i) => i.id === id);
    if (!item) return false;

    if (item.type === "folder") {
      const childIds = items.filter((i) => i.parentId === id).map((i) => i.id);
      childIds.forEach((childId) => fileStorage.deleteItem(childId));
    }

    const filtered = items.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  renameItem: (id: string, newName: string): FileItem | undefined => {
    const items = fileStorage.getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    items[index].name = newName;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items[index];
  },
};
