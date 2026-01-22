"use client";

import MyImage from "@/components/widgets/my_image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { CgClose, CgMenuGridR } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { MdAddCircle, MdHome } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import MyTextEditor from "@/components/widgets/my_text_editer";
import { OutputData } from "@editorjs/editorjs";
import { getCategoriesAction } from "@/actions/blog/categories_action";
import { categoiesResponseApi } from "@/types/api_response_type";
import { createPost } from "@/actions/blog/post_action";
import ToastHelper from "@/utils/toast_helper";

export default function CreatePost() {
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState<OutputData>();

  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [catListLoading, setCatListLoading] = useState(true);

  const [state, action, isPending] = useActionState(createPost, {
    errors: {},
    title: "",
    slug: "",
    description: "",
    tag: "",
    category: "",
  } as any);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesAction();
        // console.log("CATEGORIES ON CLIENT :: ", res);
        setCategoriesList(res);
        setCatListLoading(false);
      } catch (error) {
        console.log("ERROR --> ", error);
        setCatListLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (state.success) {
      ToastHelper(state.message, true, false);
      window.history.back();
    } else {
      ToastHelper(state.message!, false, true);
    }
  }, [state]);

  // console.log("DATA -- ", data);

  return (
    <div className="min-h-screen flex flex-col  items-center gap-4">
      {/* //? HEADER */}

      <HeaderList setShwoMenu={setShowMenu} item={showMenu} />

      <div className="w-full p-4  px-4 md:px-[10vw] lg:px-[14vw] ">
        {catListLoading ? (
          <div className="min-h-[50vh] flex flex-col gap-2 justify-center items-center ">
            <div className="  h-32 w-32 rounded-sm animate-bounce ">
              <MyImage alt="" imgPath="/images/logo_ahdi.png" />
            </div>
            <p className="text-sm text-gray-600 ">Entrain de charger...</p>
          </div>
        ) : (
          <form
            action={action}
            className="shadow-lg p-2 shadow-lime-500/50 w-full "
          >
            <div className="w-full flex flex-col gap-2 lg:flex-row ">
              {/* //? title & slug */}
              <div className="flex-1 flex flex-col">
                {/* //?Title */}
                <div className="w-full gap-2 p-2">
                  <label htmlFor="title">Titre</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Le titre de l'article"
                    className={`p-2 border  outline-none w-full rounded-md focus:border-green-500 ${
                      state?.errors && state.errors.title
                        ? "border-red-500"
                        : "border-slate-300"
                    } `}
                  />
                  {state?.errors && state.errors.title && (
                    <p className="text-sm text-red-500">{state.errors.title}</p>
                  )}
                </div>
                {/* //?slug */}
                <div className="w-full gap-2 p-2">
                  <label htmlFor="slug">Mot clé</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="Tags"
                    className={`p-2 border  outline-none w-full rounded-md focus:border-green-500 ${
                      state?.errors && state.errors.slug
                        ? "border-red-500"
                        : "border-slate-300"
                    } `}
                  />
                  {state?.errors && state.errors.slug && (
                    <p className="text-sm text-red-500">{state.errors.slug}</p>
                  )}
                </div>
              </div>
              {/* //?descrption */}
              <div className="flex-1 flex flex-col p-2  ">
                <label htmlFor="description">Courte description</label>
                <textarea
                  name="description"
                  id=""
                  placeholder="Synthese de l'artilce"
                  cols={30}
                  className={`p-2 h-[15vh] resize-none border  outline-none w-full rounded-md focus:border-green-500 ${
                    state?.errors && state.errors.description
                      ? "border-red-500"
                      : "border-slate-300"
                  } `}
                />
                {state?.errors && state.errors.description && (
                  <p className="text-sm text-red-500">
                    {state.errors.description}
                  </p>
                )}
              </div>
            </div>
            {/* //? tags && */}
            <div className="w-full flex flex-col gap-2 lg:flex-row">
              {/* //?tags */}
              <div className="w-full gap-2 p-2 flex-1">
                <label htmlFor="tag">Tags</label>
                <input
                  type="text"
                  name="tag"
                  placeholder="tag"
                  className={`p-2 border  outline-none w-full rounded-md focus:border-green-500 ${
                    state?.errors && state.errors.tag
                      ? "border-red-500"
                      : "border-slate-300"
                  } `}
                />
                {state?.errors && state.errors.tag && (
                  <p className="text-sm text-red-500">{state.errors.tag}</p>
                )}
              </div>
              {/* //?slug */}
              <div className="w-full gap-2 p-2 flex-[3]">
                <label htmlFor="category">Category</label>

                <select
                  name="category"
                  id=""
                  className="p-2 border border-slate-300 outline-none w-full rounded-md focus:border-green-500 "
                >
                  {categoriesList?.map(
                    (item: categoiesResponseApi, index: number) => {
                      return (
                        <option key={index} value={item.name}>
                          {" "}
                          {item.name}{" "}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className="p-2">
              <MyTextEditor data={data} onChange={setData} />
            </div>
            <input
              type="text"
              name="content"
              className="hidden"
              defaultValue={JSON.stringify(data)}
            />
            {isPending ? (
              <div className="w-full flex justify-center items-center p-2 ">
                <div className="border-b-2 mx-auto animate-spin border-green-500 h-6 w-6 rounded-full" />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md py-2 mt-4 text-white bg-[#111] transition-all duration-200 cursor-pointer hover:bg-green-500 "
              >
                Creer
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

function HeaderList({
  setShwoMenu,
  item,
}: {
  setShwoMenu: (item: boolean) => void;
  item: boolean;
}) {
  return (
    <div className=" px-4 w-full  border-b border-slate-400 relative py-2 flex justify-between gap-4 lg:py-3 md:px-[5vw] lg:px-[10vw] ">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 mr-2 flex justify-center items-center">
          <MyImage alt="" imgPath="/images/logo_ahdi.png" />
        </div>
        <div className="h-10 w-px bg-slate-400" />
        <div
          onClick={() => setShwoMenu(true)}
          className="p-1 bg-slate-200 rounded-sm transition-all duration-300 cursor-pointer hover:bg-slate-300 "
        >
          <CgMenuGridR className="text-4xl text-green-500 " />
        </div>
      </div>

      {/* //?menu modal */}
      <div
        className={`  p-2 bg-white shadow-lg flex flex-wrap gap-4 shadow-green-900/10 transition-all duration-300 absolute top-[10vh] ${
          item
            ? " translate-y-0 opacity-100 pointer-events-auto "
            : " translate-y-10 opacity-0 pointer-events-none "
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
          href={"/dashboard"}
          className="text-white py-2 rounded-md px-2 flex flex-col  bg-green-500  items-center gap-2 "
        >
          <FaThList className=" text-3xl lg:text-5xl" />
          <p className=" text-xs lg:text-sm">Voir les articles</p>
        </Link>
        <Link
          href={"/dashboard/categories"}
          className="text-white py-2 rounded-md px-2 flex flex-col  bg-green-500  items-center gap-2 "
        >
          <PiListPlusFill className=" text-3xl lg:text-5xl" />
          <div className="w-[5.5rem] text-center  ">
            <p className=" text-xs lg:text-sm">Categorie</p>
          </div>
        </Link>

        {/* //? close BTN */}
        <div
          className={`absolute p-1 -top-4 -right-4 bg-green-50 rounded-sm transition-all duration-300 hover:bg-green-300 cursor-pointer `}
        >
          <CgClose onClick={() => setShwoMenu(false)} className="text-2xl" />
        </div>
      </div>
      <div className="flex gap-2 items-center text-slate-600 ">
        <span>
          <IoLogOut className="text-4xl " />
        </span>
        <p className="hidden md:block ">Se deconnecter</p>
      </div>
    </div>
  );
}
