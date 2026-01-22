"use client";

import { getCategoriesAction } from "@/actions/blog/categories_action";
import { createPost, updatePost } from "@/actions/blog/post_action";
import MyImage from "@/components/widgets/my_image";
import MyTextEditor from "@/components/widgets/my_text_editer";

import { categoiesResponseApi } from "@/types/api_response_type";
import ToastHelper from "@/utils/toast_helper";
import { OutputData } from "@editorjs/editorjs";
import { useActionState, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

type EditModalProps = {
  title: string;
  slug: string;
  excerpt: string;
  tag: string;
  category: string;
  content: string;
};

export default function EditModal({
  dataToEdit,
  onClose,
}: {
  dataToEdit: EditModalProps;
  onClose: () => void;
}) {
  const [state, action, isPending] = useActionState(updatePost, {
    errors: {},
    title: "",
    slug: "",
    description: "",
    tag: "",
    category: "",
  } as any);

  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [catListLoading, setCatListLoading] = useState(true);
  const [data, setData] = useState<OutputData>();

  //   ?? FECTING CATEGORIES FOR SELECT INPUT
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
      // window.history.back();
    } else {
      ToastHelper(state.message!, false, true);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col  items-center gap-4">
      <div className="w-full p-4  px-4  ">
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
            className="shadow-lg p-2 bg-white rounded-sm shadow-lime-500/50 w-full relative"
          >
            <div onClick={onClose} className="flex justify-end ">
              <IoMdCloseCircle className="text-2xl lg:text-4xl text-black " />
            </div>
            <div className="w-full flex flex-col gap-2 lg:flex-row ">
              {/* //? title & slug */}
              <div className="flex-1 flex flex-col">
                {/* //?Title */}
                <div className="w-full gap-2 p-2">
                  <label htmlFor="title">Titre</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={dataToEdit?.title ?? ""}
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
                    defaultValue={dataToEdit?.slug ?? ""}
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
                  defaultValue={dataToEdit?.excerpt ?? ""}
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
                  defaultValue={dataToEdit?.tag ?? ""}
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
              <MyTextEditor data={data} onChange={setData} post={dataToEdit} />
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
                Modifier
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
