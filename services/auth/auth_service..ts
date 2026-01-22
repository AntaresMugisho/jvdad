"use server";
import { api } from "@/lib/api_config";
import { registerApiResponse } from "@/types/api_response_type";
import { authType } from "@/types/data";

import { cookies } from "next/headers";

export async function registeringAuth(data: authType) {
  console.log("USER REGISTER  SERVICE --> ", data);

  try {
    const res = await api.post<registerApiResponse>(api.auth.create, data);
    console.log(res, " <------ DATA RES REGISTER USER");

    if (res?.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", JSON.stringify(res), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return res;
  } catch (error: any) {
    console.log("something went wrong on registering USER :: ", error);
  }
}

export async function loginAuth(data: { email: string; password: string }) {
  console.log("USER LOGIN  SERVICE --> ", data);

  try {
    const res = await api.post<{ user: {}; token: string }>(
      api.auth.login!,
      data
    );
    console.log("RESULT SERVICE LOGIN ::: ", res);

    if (res?.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", JSON.stringify(res), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return res;
  } catch (error: any) {
    console.log("something went wrong on login in USER :: ", error);
  }
}

export async function gettingAuthMe() {
  console.log("getting auth");

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
    // console.log("T O K E N :::: ", token.token);

    const res = await api.get(api.auth.me, token.token);

    console.log("res ME ::: ", res);

    return res;
  } catch (error: any) {
    console.log("GETTING AUTH SERVICE GOES WRONG --> ", error);
  }
}
