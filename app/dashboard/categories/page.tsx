"use client";

import {
  createCategory,
  getCategoriesAction,
} from "@/actions/blog/categories_action";
import MyImage from "@/components/widgets/my_image";
import { categoiesResponseApi } from "@/types/api_response_type";
import { gettingDate } from "@/utils/format_date";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { CgClose, CgMenuGridR } from "react-icons/cg";
import { FaThList } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDelete, MdHome } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import ToastHelper from "@/utils/toast_helper";

export default function Categories() {
  const [showMenu, setShowMenu] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [catListLoading, setCatListLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [state, action, isPending] = useActionState(createCategory, {
    errors: {},
    name: "",
    slug: "",
    description: "",
  });

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
      window.location.reload();
    } else {
      ToastHelper(state.message!, false, true);
    }
  }, [state]);

  console.log("CATEGORIES ON CLIENT :: ", categoriesList);

  if (catListLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-2 justify-center items-center ">
        <div className="  h-32 w-32 rounded-sm animate-bounce ">
          <MyImage alt="" imgPath="/images/logo_ahdi.png" />
        </div>
        <p className="text-sm text-gray-600 ">Entrain de charger...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full flex-col gap-8">
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
            href={"/dashboard"}
            className="text-white py-2 rounded-md px-2 flex flex-col  bg-green-500  items-center gap-2 "
          >
            <FaThList className=" text-3xl lg:text-5xl" />
            <p className=" text-xs lg:text-sm">Voir les articles</p>
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

      {/* //? TITLE */}
      <div className="px-4 w-full py-2 flex justify-between gap-4 lg:py-3 md:px-[5vw] lg:px-[10vw]">
        <h2 className="text-4xl font-semibold text-[#555] ">
          Categories d'Article
        </h2>
        {/* //? add btn */}
        <div
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2 text-white rounded-md bg-[#111] lg:px-7 transition-all duration-300 cursor-pointer hover:bg-green-500  "
        >
          Ajouter une categorie
        </div>
      </div>

      {/* //? list */}
      <div className="w-full flex px-10 md:px-[10vw] lg:px-[22vw] py-8 ">
        <div className="p-4 rounded-sm w-full bg-white shadow-lg shadow-green-950/10 ">
          {categoriesList?.map((item: categoiesResponseApi, index: number) => {
            return (
              <div
                key={index}
                // onClick={() =>{}}
                className="flex gap-3 relative pr-6 p-2 border-b "
              >
                {/* image */}
                <div className="h-14 w-14 rounded-sm bg-slate-100">
                  {/* <MyImage alt="" imgPath={item?.image} /> */}
                </div>
                {/* content */}
                <div>
                  <div className="flex gap-2">
                    <p className="text-xl  font-semibold text-[#111] ">
                      {" "}
                      {item.name}
                    </p>
                    {/* <div className="h-5 w-px bg-slate-600 " />
                    <p className="text-lg  text-[#111] "> {item.slug}</p> */}
                  </div>
                  <p className="text-sm text-[#555] "> {item.description}</p>
                  <p className="text-sm text-[#555] ">
                    {" "}
                    Creer le {gettingDate(item.created_at)} - Modifier le{" "}
                    {gettingDate(item.updated_at)}
                  </p>
                </div>

                {/* action */}
                <div className=" flex items-center  gap-2 absolute right-4 top-4 ">
                  <p className="text-sm lg:text-base">
                    Nbr Posts: {item.posts_count}
                  </p>
                  <div className="h-4 w-px bg-slate-600 " />
                  <CiEdit className="text-2xl transition-all cursor-pointer duration-200 hover:text-green-500 hover:scale-105" />
                  <div className="h-4 w-px bg-slate-600 " />
                  <MdDelete className="text-2xl transition-all cursor-pointer duration-200 hover:text-red-500 hover:scale-105  " />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* //? MODAL ADD */}
      <div
        onClick={(e) => {
          if (e.target == e.currentTarget) {
            setShowAddModal(false);
          }
        }}
        className={`fixed h-screen w-full flex justify-center items-center bg-black/20 transition-all duration-300 ${
          showAddModal
            ? " opacity-100 pointer-events-auto "
            : " opacity-0 pointer-events-none "
        } `}
      >
        <form
          action={action}
          className={`realtive pt-10 flex flex-col gap-6 p-4 min-h-[50vh] w-[90vw] md:w-[70vw] lg:w-[30vw] bg-white shadow-lg transition-all duration-200 ${
            showAddModal
              ? "opacity-100 translate-y-0 "
              : "translate-y-10 opacity-0"
          } `}
        >
          <div className="w-full font-semibold text-xl text-[#111] ">
            Creer une categorie
          </div>
          {/* form */}
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1 ">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="entrer le nom de la categorie"
                className="w-full p-2 outline-none border border-slate-400 rounded-md "
              />
            </div>
            <div className="w-full flex flex-col gap-1 ">
              <label htmlFor="name">Slug</label>
              <input
                required
                type="text"
                name="slug"
                placeholder="Enter le mot clé"
                className="w-full p-2 outline-none border border-slate-400 rounded-md "
              />
            </div>
            <div className="w-full flex flex-col gap-1 ">
              <label htmlFor="description">Description</label>
              <textarea
                required
                name="description"
                color="40"
                placeholder="Description de la categorie"
                className="w-full p-2 outline-none resize-none border border-slate-400 rounded-md "
              />
            </div>
            {/* <div className="w-full bg-slate-500">
              <label
                htmlFor="image"
                className="w-full border-2 border-red-500 rounded-md"
              >
                gfg
              </label>
            </div> */}
            {isPending ? (
              <div className="w-full flex justify-center items-center p-2 ">
                <div className="border-b-2 mx-auto animate-spin border-green-500 h-6 w-6 rounded-full" />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#111] py-2 rounded-sm text-white text-center transition-all duration-200 cursor-pointer hover:bg-green-500  "
              >
                Ajouter
              </button>
            )}
          </div>
          {/* //cancel */}
          <MdCancel
            onClick={() => setShowAddModal(false)}
            className=" absolute top-4 right-4 text-2xl transition-all duration-200 text-[#111] hover:text-red-500 "
          />
        </form>
      </div>
    </div>
  );
}
