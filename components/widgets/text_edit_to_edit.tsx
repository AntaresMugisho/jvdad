"use client";

import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

type Props = {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
  post: any;
};

export default function MyTextEditor({ data, onChange, post }: Props) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!isMounted) return;

      // ✅ Dynamic imports — load tools only when the component mounts (client-side)
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const LinkTool = (await import("@editorjs/link")).default;
      // const Attaches = (await import("@editorjs/attaches")).default;
      const CheckList = (await import("@editorjs/checklist")).default;
      const Table = (await import("@editorjs/table")).default;

      import("@editorjs/editorjs").then(({ default: EditorJS }) => {
        const editor = new EditorJS({
          holder: "editorjs",
          autofocus: true,
          data: post ? JSON.parse(post.content) : undefined,
          tools: {
            header: Header,
            list: List,
            paragraph: Paragraph,
            table: Table,
            linkTool: LinkTool,
            checkList: CheckList,
            // attaches: {
            //   class: Attaches,
            //   config: {
            //     uploader: {
            //       uploadByFile: async (file: File) => {
            //         const formData = new FormData();
            //         formData.append("image", file);
            //         const res = await fetch(
            //           `${process.env.NEXT_PUBLIC_URL}/api/upload`,
            //           // "https://edu-community-puce.vercel.app/api/upload",
            //           {
            //             method: "POST",
            //             body: formData,
            //           }
            //         );
            //         return res.json();
            //       },
            //     },
            //   },
            // },
            image: {
              class: ImageTool,
              config: {
                endpoints: {
                  byFile: "http://ahdi.artrev.net/api/v1/drive/upload", // for file uploads
                  byUrl: "http://ahdi.artrev.net/api/v1/drive/upload", // optional if supporting image fetch by URL
                },
              },
            },
          },

          onChange: async () => {
            const content = await editor.save();
            onChange?.(content);
          },
        });
        editorRef.current = editor;
      });
    })();

    return () => {
      isMounted = false;
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="editorjs"
      className="border border-slate-300 overflow-scroll   h-[60vh] rounded-md p-3"
    />
  );
}
