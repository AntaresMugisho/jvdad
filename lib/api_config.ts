import { getPostApiType, postApiType } from "@/types/enpoints_type";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export class ApiConfig {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  //? urls gettes
  get auth(): { create: string; login: string; me: string } {
    return {
      create: `${this.baseUrl}/auth/register`,
      login: `${this.baseUrl}/auth/login`,
      me: `${this.baseUrl}/auth/me`,
    };
  }

  get posts(): {
    all: string;
    image: string;
    create: string;
    byId: (id: string) => string;
    update: (id: string) => string;
  } {
    return {
      all: `${this.baseUrl}/posts`,
      image: `${this.baseUrl}/drive/upload`,
      create: `${this.baseUrl}/posts`,
      byId: (id: string) => `${this.baseUrl}/posts/${id}`,
      update: (id: string) => `${this.baseUrl}/posts/${id}`,
    };
  }

  get categories(): { all: string; create: string } {
    return {
      all: `${this.baseUrl}/categories`,
      create: `${this.baseUrl}/categories`,
    };
  }

  //?? SERVICE FETCHING
  // *********************************

  //? GET
  async get<T>(url: string, token?: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      console.log(res, " :::::::::::::::::::::::::::: <-- RES GET api STATUS");
    }
    return res.json();
  }

  //? POST
  async post<T>(
    url: string,
    body: any,
    token?: string,
    options?: RequestInit
  ): Promise<T> {
    const res = await fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    // if (!res.ok) throw new Error(`POST ${url} failed`);
    // console.log("R E S    R O U T E R :::: ", await res.json());

    if (!res.ok) {
      console.log(res.status, " :::::::::::::::::::::::::::: <-- RES STATUS");
    }

    return res.json();
  }

  //? PUT
  async put<T>(
    url: string,
    body: any,
    token?: string,
    options?: RequestInit
  ): Promise<T> {
    const res = await fetch(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    // if (!res.ok) throw new Error(`POST ${url} failed`);
    // console.log("R E S    R O U T E R :::: ", await res.json());

    if (!res.ok) {
      console.log(res.status, " :::::::::::::::::::::::::::: <-- RES STATUS");
    }

    return res.json();
  }
}

//? YEAH BRO, NOW WE INSTANCIATE IT
export const api = new ApiConfig("http://localhost:8000/api/v1");
// export const api = new ApiConfig("http://ahdi.artrev.net/api/v1");
