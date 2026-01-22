"use server";

import { api } from "@/lib/api_config";
import { getAllPostsResType } from "@/types/api_response_type";
import { posetCreatType } from "@/types/data";
import { cookies } from "next/headers";

export async function gettingAllPosts() {
  console.log("GETTING ALL POST");

  try {
    const res = await api.get<getAllPostsResType>(api.posts.all);

    // console.log("RES GETTING POSTS :: ", res);

    return res;
  } catch (error: any) {
    console.log("something went wrong on getting posts >> ", error);
  }
}

export async function gettingPostById(id: string) {
  console.log("GETTING POST BY ID ", id);

  try {
    const res = await api.get<any>(api.posts.byId(id));

    console.log("RES GETTING POST BY ID :: ", res);

    return res;
  } catch (error: any) {
    console.log("something went wrong on getting post by id >> ", error);
  }
}

export async function creatingPost(data: posetCreatType) {
  console.log("GETTING ALL POST");

  try {
    const cookieStore = await cookies();

    const tokenValue = cookieStore.get("token");
    const token = JSON.parse(tokenValue?.value!) as {
      user: {
        name: string;
        email: string;
        id: number;
      };
      token: string;
    };
    console.log("T O K E N :::: ", token.token);
    const res = await api.post(api.posts.create, data, token.token);
    console.log("R E S CREATE POST SERVICE :::: ", res);

    return res;
  } catch (error: any) {
    console.log("Erreur on creating post:: ", error);
  }
}

export async function updatingPost({
  data,
  id,
}: {
  data: posetCreatType;
  id: string;
}) {
  try {
    const cookieStore = await cookies();

    const tokenValue = cookieStore.get("token");
    const token = JSON.parse(tokenValue?.value!) as {
      user: {
        name: string;
        email: string;
        id: number;
      };
      token: string;
    };
    console.log("T O K E N :::: ", token.token);
    const res = await api.put(api.posts.update(id), data, token.token);
    console.log("R E S UPDATING POST SERVICE :::: ", res);

    return res;
  } catch (error: any) {
    console.log("Erreur on UPDATING post:: ", error);
  }
}
