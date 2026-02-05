
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const BASE_API_URL = process.env.BASE_URL

console.log(BASE_API_URL)

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios interceptors config
//--------------------------------------------------------------------------------
api.interceptors.request.use(
  async (config) => {
    const { tokenStorage } = await import("@/stores/token-store");

    // Get fresh access token
    const accessToken = await tokenStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error", error);
    return Promise.reject(error);
  },
);

const throwError = (err: AxiosError) => {
  console.error(err);
  let errorData = (err.response?.data as any)?.object;
  if (!errorData) {
    errorData = err.response?.data;
  }

  throw {
    code: errorData?.response_code,
    message: errorData?.response_message,
    data: { ...errorData?.response_data, code: errorData?.response_code },
  };
};


// REST APIs
//-----------------------------------------------------------------------------------------


// AUTHENTICATION
export const authApi = {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string,
  ) =>
    api
      .post("/auth/register/", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password2,
        username: email,
      })
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  login: (email: string, password: string) =>
    api
      .post("/auth/login/", { email: email, password: password })
      .then((response) => {
        return response.data;
      })
      .catch((error) => throwError(error)),

  tokenRefresh: (refresh: string) =>
    api
      .post("/auth/token/refresh", { refresh })
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  tokenVerify: (token: string) =>
    api
      .post("/auth/token/verify", { token })
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  tokenInvalidate: () =>
    api
      .post("/auth/token/invalidate")
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  me: () =>
    api
      .get("/auth/me/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  logout: () =>
    api
      .post("/auth/logout/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  verifyOTP: (code: string, email: string) =>
    api
      .post("/auth/otp/verify/", { code, email })
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  resendOTP: (email: string) =>
    api
      .post("/auth/otp/resend/", { email })
      .then((response) => response.data)
      .catch((error) => throwError(error)),
};

// Blog 
export const blogAPI = {
  posts: {
    list: () =>
      api
        .get("/blog/posts/")
        .then((response) => response.data)
        .catch((error) => throwError(error)),
    detail: (slug: string) => api.get(`/blog/posts/${slug}/`).then((response) => response.data),
    create: (data: any) =>
      api.post("/blog/posts/", {...data, image: data.coverImage, category_id: 3}),
    update: (slug: string, data: any) => api.patch(`/blog/posts/${slug}/`, data),
    delete: (slug: string) => api.delete(`/blog/posts/${slug}/`),
  },

  blogCategories: {
    list: () =>
      api
        .get("/blog/categories/")
        .then((response) => response.data)
        .catch((error) => throwError(error)),
    detail: (id: number) => api.get(`/blog/categories/${id}/`).then((response) => response.data),
    create: (name: string) => api.post("/blog/categories/", { name }),
    update: (id: number, data: any) => api.patch(`/blog/categories/${id}/`, data),
    delete: (id: number) => api.delete(`/blog/categories/${id}/`),
  },
};

// Dashboard
export const dashboardApi = {
  overview: () =>
    api
      .get("/dashboard/overview/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),
};

// Projects
export const projectsApi = {
  list: () =>
    api
      .get("/website/projects/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  detail: (id: string | number) =>
    api
      .get(`/website/projects/${id}/`)
      .then((response) => response.data)
      .catch((error) => throwError(error)),

  create: (data: any, config?: AxiosRequestConfig) => api.post("/website/projects/", data, config),
  update: (id: string | number, data: any, config?: AxiosRequestConfig) =>
    api.patch(`/website/projects/${id}/`, data, config),
  delete: (id: string | number) => api.delete(`/website/projects/${id}/`),
};

// Gallery
export const galleryApi = {
  list: () =>
    api
      .get("/website/gallery/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),
  create: (data: any, config?: AxiosRequestConfig) => api.post("/website/gallery/", data, config),
  update: (id: string | number, data: any, config?: AxiosRequestConfig) =>
    api.patch(`/website/gallery/${id}/`, data, config),
  delete: (id: string | number) => api.delete(`/website/gallery/${id}/`),
};

// Testimonials
export const testimonialsApi = {
  list: () =>
    api
      .get("/website/testimonials/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),
  create: (data: any, config?: AxiosRequestConfig) =>
    api.post("/website/testimonials/", data, config),
  update: (id: string | number, data: any, config?: AxiosRequestConfig) =>
    api.patch(`/website/testimonials/${id}/`, data, config),
  delete: (id: string | number) => api.delete(`/website/testimonials/${id}/`),
};

// Address
export const addressApi = {
  list: () =>
    api
      .get("/website/address/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),
  create: (data: any, config?: AxiosRequestConfig) => api.post("/website/address/", data, config),
  update: (id: string | number, data: any, config?: AxiosRequestConfig) =>
    api.patch(`/website/address/${id}/`, data, config),
  delete: (id: string | number) => api.delete(`/website/address/${id}/`),
};


// Organisation
export const organisationApi = {
  list: () =>
    api
      .get("/website/organisation/")
      .then((response) => response.data)
      .catch((error) => throwError(error)),
  create: (data: any, config?: AxiosRequestConfig) =>
    api.post("/website/organisation/", data, config),
  update: (id: string | number, data: any, config?: AxiosRequestConfig) =>
    api.patch(`/website/organisation/${id}/`, data, config),
  delete: (id: string | number) => api.delete(`/website/organisation/${id}/`),
};