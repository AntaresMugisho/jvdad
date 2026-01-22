"use client";

import { useEffect, useRef } from "react";

interface BlogEditorProps {
  data?: any;
  onChange?: (data: any) => void;
  readOnly?: boolean;
}

export function BlogEditor({ data, onChange, readOnly = false }: BlogEditorProps) {
  const editorRef = useRef<any | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    if (editorRef.current) {
      editorRef.current.destroy();
    }

    let isMounted = true;

    (async () => {
      const { default: EditorJS } = await import("@editorjs/editorjs");
      const { default: Header } = await import("@editorjs/header");
      const { default: List } = await import("@editorjs/list");
      const { default: Paragraph } = await import("@editorjs/paragraph");
      const { default: Quote } = await import("@editorjs/quote");

      if (!isMounted || !holderRef.current) return;

      const editor = new EditorJS({
        holder: holderRef.current,
        data: data || {
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Commencez à écrire votre article...",
              },
            },
          ],
        },
        tools: {
          header: {
            class: Header as any,
            config: {
              placeholder: "Titre",
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List as any,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph as any,
            inlineToolbar: true,
          },
          quote: {
            class: Quote as any,
            inlineToolbar: true,
            },
        },
        readOnly,
        onChange: async () => {
          if (onChange && editorRef.current) {
            const content = await editorRef.current.save();
            onChange(content);
          }
        },
      });

      editorRef.current = editor;
    })();

    return () => {
      isMounted = false;
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, readOnly, onChange]);

  return (
    <div
      ref={holderRef}
      className="prose prose-sm max-w-none dark:prose-invert"
      data-testid="editor-content"
    />
  );
}
