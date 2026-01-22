"use client";

import { getAuthMe } from "@/actions/auth/auth_action";
import { getPostAction } from "@/actions/blog/post_action";
import MyImage from "@/components/widgets/my_image";
import { Image } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgClose, CgMenuGridR } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { MdAddCircle, MdHome } from "react-icons/md";
import { truncateText } from "@/utils/truncate";
import { FaCommentAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditModal from "./components/edit";

export default function Dashboard() {
  const [auth, setAuth] = useState({
    id: 0,
    name: "",
    email: "",
  });
  const [postsList, setPostList] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<any>(null);

  useEffect(() => {
    const fecthAuth = async () => {
      try {
        const res = (await getAuthMe()) as {
          id: any;
          name: string;
          email: string;
        };
        // console.log(" ::: ", res);
        const postRes = await getPostAction();

        console.log("POSTS :::: ", postRes?.total);
        console.log("POSTS Data :::: ", postRes?.data!);
        setAuth(res as any);
        setPostList(postRes?.data!);
        setAuthLoading(false);
      } catch (error) {
        console.log("WENT REALY WRONG -- ", error);
        setAuthLoading(false);
      }
    };

    fecthAuth();
  }, []);

  // console.log("now log auth ", auth);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-2 justify-center items-center ">
        <div className="flex justify-center items-center  h-32 w-32 rounded-sm animate-bounce ">
          <MyImage alt="" imgPath="/images/logo_ahdi.png" />
        </div>
        <p className="text-sm text-gray-600 ">Entrain de charger...</p>
      </div>
    );
  }
  //   <{ id: any; name: string; email: string }>

  if (!authLoading && !auth) {
    return (
      <div className="min-h-screen flex flex-col gap-2 justify-center items-center ">
        <h2>Erreur!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex  flex-col gap-8 items-center relative">
      {/* //? HEADER */}
      <div className=" px-4 w-full  border-b border-slate-400 relative py-2 flex justify-between gap-4 lg:py-3 md:px-[5vw] lg:px-[10vw] ">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 mr-2 flex justify-center items-center">
            <MyImage alt="" imgPath="/images/logo_ahdi.png" />
          </div>
          <div className="h-10 w-px bg-slate-400" />
          <div
            onClick={() => setShowMenu(true)}
            className="p-1 bg-slate-200 rounded-sm transition-all duration-300 cursor-pointer hover:bg-slate-300 "
          >
            <CgMenuGridR className="text-4xl text-green-500 " />
          </div>
        </div>

        {/* //?menu modal */}
        <div
          className={`  p-2 bg-white shadow-lg flex flex-wrap gap-4 shadow-green-900/10 transition-all duration-300 absolute top-[10vh] ${
            showMenu
              ? " translate-y-0 opacity-100 "
              : " translate-y-10 opacity-0 "
          }  `}
        >
          <Link
            href={"/"}
            className="text-white py-2 rounded-md px-2 flex flex-col  bg-green-500  items-center gap-2 "
          >
            <MdHome className=" text-3xl lg:text-5xl" />
            <p className=" text-xs lg:text-sm">Page d'accueil</p>
          </Link>
          <Link
            href={"/dashboard/create"}
            className="text-white py-2 rounded-md px-2 flex flex-col  bg-green-500  items-center gap-2 "
          >
            <MdAddCircle className=" text-3xl lg:text-5xl" />
            <p className=" text-xs lg:text-sm">Ajouter un article</p>
          </Link>
          {/* //? close BTN */}
          <div
            className={`absolute p-1 -top-4 -right-4 bg-green-50 rounded-sm transition-all duration-300 hover:bg-green-300 cursor-pointer `}
          >
            <CgClose onClick={() => setShowMenu(false)} className="text-2xl" />
          </div>
        </div>
        <div className="flex gap-2 items-center text-slate-600 ">
          <span>
            <IoLogOut className="text-4xl " />
          </span>
          <p className="hidden md:block ">Se deconnecter</p>
        </div>
      </div>

      {/* //? CONTENT */}
      <div className="w-full text-center flex flex-col items-center p-4   ">
        <h1 className="text-3xl md:text-4xl font-bold text-[#111]">
          {" "}
          Bienvenue {auth?.name} sur le Dashboard{" "}
        </h1>
        <div className="mt-2 flex flex-col justify-center items-center gap-2 text-slate-500 lg:flex-row ">
          <p>Visualiser les articles postés, creer, modifier et supprimer</p>{" "}
          <div className="h-px w-20 bg-slate-600 lg:h-4 lg:w-px " />
          <p>
            Visualiser les commentaires postés, creer, modifier et supprimer
          </p>{" "}
        </div>

        {/* //? LIST POST */}
        {postsList.length == 0 ? (
          <div className="w-full min-h-[70vh] flex flex-col gap-4  justify-center items-center">
            <TbMoodEmptyFilled className="text-9xl text-[#111] lg:text-[16rem] " />
            <p className="text-slate-600">
              Aucun article posté pour le moment, commencez par poster
            </p>

            <Link
              href={`/dashboard/create`}
              className="px-10 py-1.5 bg-green-500 text-white rounded-sm transition-all duration-300 hover:bg-green-700 "
            >
              Creer un post
            </Link>
          </div>
        ) : (
          <div className="w-full mt-8 py-8 grid gap-3 md:gap-4 grid-cols-2 px-14 md:grid-cols-4 md:px-[7vw] lg:grid-cols-4 lg:px-[14vw] ">
            {postsList.map((post: any) => (
              <div
                key={post.id}
                className="p-2 shadow-md rounded-sm min-h-[20vh] shadow-slate-500/30 flex flex-col bg-white "
              >
                {/* image */}
                <Link
                  href={`dashboard/article/${post.id}`}
                  className="h-[20vh] flex justify-center items-center bg-slate-200 "
                >
                  <MyImage
                    alt={post.title}
                    imgPath={
                      post.image ? post.image : "/images/placeholder_image.png"
                    }
                  />
                </Link>
                {/* text */}
                <div className="text-2xl p-2 md:p-4 font-semibold text-[#111] text-center lg:text-start ">
                  <p className="text-[#111] text-sm font-semibold ">
                    #{post.tags?.[0]}
                  </p>
                  <h2>{post.title}</h2>
                  <p className="text-[#555] font-normal text-lg lg:text-xl ">
                    {truncateText(post.excerpt, 20)}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between gap-2 md:gap-4">
                  <div className="flex items-center gap-1">
                    <FaCommentAlt className="text-[#555] text-xl font-normal " />
                    <p className="text-[#555] font-normal ">
                      {post.comments.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <div
                      onClick={() => {
                        setEditModal(true);
                        setDataToEdit(post);
                      }}
                      className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-green-700 transition-all duration-300 "
                    >
                      <CiEdit className=" text-xl font-normal " />
                      <p className=" font-normal ">modifier</p>
                    </div>
                    <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-red-700 transition-all duration-300 ">
                      <MdDelete className=" text-xl font-normal " />
                      {/* <p className=" font-normal ">Supprimer</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* //? EDIT MODAL */}
      <div
        className={`fixed flex justify-center items-center h-screen transition-all duration-200 top-0 left-0 w-full bg-black/30 ${
          editModal
            ? "opacity-100 pointer-events-auto "
            : "opacity-0 pointer-events-none "
        } `}
      >
        <div className="w-full overflow-scroll h-[90vh]  md:w-[50vw] lg:w-[40vw] ">
          <EditModal
            dataToEdit={dataToEdit}
            onClose={() => setEditModal(false)}
          />{" "}
        </div>{" "}
      </div>
    </div>
  );
}
