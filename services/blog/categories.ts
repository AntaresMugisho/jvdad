import { api } from "@/lib/api_config";
import { categoiesResponseApi } from "@/types/api_response_type";
import { cookies } from "next/headers";

export async function gettingCategories() {
  console.log("GETTING CATEGORIES");
  try {
    const res = await api.get<categoiesResponseApi>(api.categories.all);
    console.log("RESPONS DATE ::: ", res);
    return res;
  } catch (error: any) {
    console.log("GETTING CATEGORIES WENT WRONG :: ", error);
  }
}

export async function creatingCAtegories(data: {
  name: string;
  slug: string;
  description: string;
}) {
  console.log("CREATIONG CATEGORY");

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
    const res = await api.post(api.categories.create, data, token.token);
    console.log("R E S CREATE CAT SERVICE :::: ", res);

    return res;
  } catch (error: any) {
    console.log("CREATIONG CATEGORIES WENT WRONG :: ", error);
  }
}
