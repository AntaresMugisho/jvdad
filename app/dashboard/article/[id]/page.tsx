"use client";

import dynamic from "next/dynamic";
import MyImage from "@/components/widgets/my_image";
// ✅ Correct
import { gettingPostById } from "@/services/blog/articles";

import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect } from "react";

const Output = dynamic(() => import("editorjs-react-renderer"), { ssr: false });

interface PageProps {
  params: { id: string };
}

interface PageProps {
  params: { id: string };
}
export default function DetailPostPage({ params }: PageProps) {
  const [post, setPost] = React.useState<{
    id: number;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    tags: string;
    image: string;
  }>({
    id: 0,
    title: "",
    excerpt: "",
    content: "",
    slug: "",
    tags: "",
    image: "",
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [id, setId] = React.useState<string>();

  // console.log("PARAMS :: ", id);

  useEffect(() => {
    const fetchPost = async () => {
      const { id } = await params;
      setId(id);
      try {
        const post = await gettingPostById(id);
        console.log("POST DATA FETCHED :: ", post);
        setPost(post);
      } catch (error) {
        console.log("Error fetching post by id :: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // console.log("POST DETAIL PAGE ::: ", post.title);

  return (
    <div className="flex justify-center py-8">
      <div className="w-full min-h-screen bg-white shadow-2xl shadow-green-500/20 md:w-[60vw] lg:w-[50vw]">
        <div className="w-full p-2 ">
          <ArrowLeftIcon
            className="text-3xl text-green-500 cursor-pointer lg:text-4xl "
            onClick={() => window.history.back()}
          />
        </div>
        {loading ? (
          <div className="min-h-[50vh] flex flex-col gap-2 justify-center items-center ">
            <div className="  h-32 w-32 rounded-sm animate-bounce ">
              <MyImage alt="" imgPath="/images/logo_ahdi.png" />
            </div>
            <p className="text-sm text-gray-600 ">Entrain de charger...</p>
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-4 ">
            <h2 className="text-2xl font-semibold text-green-600 ">
              {post.title}
            </h2>
            <div className="prose prose-stone lg:prose-xl max-w-none">
              <Output data={JSON.parse(post.content)} />
            </div>
          </div>
        )}
        {/* DetailPostPage {post.title} */}
      </div>
    </div>
  );
}
