"use server";
import { postShema } from "@/models/rules/posts_roules";
import {
  creatingPost,
  gettingAllPosts,
  updatingPost,
} from "@/services/blog/articles";
import { cookies } from "next/headers";

export async function getPostAction() {
  console.log("CTION GET POSTS");

  try {
    const res = await gettingAllPosts();
    // console.log("posts get action res", res);

    return res;
  } catch (error) {
    console.log("went wrong when getting action", error);
  }
}

export async function createPost(state, formData) {
  console.log("Create post action --");

  const cookieStore = await cookies();

  const tokenValue = cookieStore.get("token");
  const token = JSON.parse(tokenValue.value);

  console.log("T O K E N :::: ", token.user.id);

  //? VALIDATING THE FORM DATA
  const validatedFields = postShema.safeParse({
    title: formData.get("title")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    tag: formData.get("tag")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    author: token.tokem,
  });

  console.log("D A T A  FORM :::: ", validatedFields);

  // ? SENDING ERROR IF GOT
  if (!validatedFields.success) {
    const fieldErrors = {};

    validatedFields.error.issues.forEach((issue) => {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
        // console.log( issue);
      }
    });

    console.log("D A T A -- E R R O R :::: ", fieldErrors);

    return {
      errors: fieldErrors,
      title: formData.get("title")?.toString() ?? "",
      slug: formData.get("slug")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      tag: formData.get("tag")?.toString() ?? "",
      category: formData.get("category")?.toString() ?? "",
    };
  }
  const data = {
    title: validatedFields.data.title,
    excerpt: validatedFields.data.description,
    content: validatedFields.data.content,
    slug: validatedFields.data.slug,
    tags: validatedFields.data.tag,
    category: validatedFields.data.slug,
    status: "draft",
    author: token.user.id,
  };

  console.log("data befor ::: ", data);

  const res = await creatingPost({
    title: validatedFields.data.title,
    excerpt: validatedFields.data.description,
    content: validatedFields.data.content,
    slug: validatedFields.data.slug,
    tags: [validatedFields.data.tag],
    category: [validatedFields.data.slug],
    status: "draft",
    author: token.user.id,
  });

  console.log("RES FROM CREATE POST :: ", res);

  // const res = await creatingCAtegories(validatedFields.data);
  // console.log("CATE get action res", res);

  if (res.title) {
    return {
      success: true,
      message: "Creer avec succee!",
    };
  }

  return {
    success: false,
    message: "Une erreur est survenue",
  };
  // return res;
}

export async function updatePost(state, formData) {
  console.log("update post action --");

  const cookieStore = await cookies();

  const tokenValue = cookieStore.get("token");
  const token = JSON.parse(tokenValue.value);

  console.log("T O K E N :::: ", token.user.id);

  //? VALIDATING THE FORM DATA
  const validatedFields = postShema.safeParse({
    title: formData.get("title")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    tag: formData.get("tag")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    author: token.tokem,
  });

  console.log("D A T A  FORM :::: ", validatedFields);

  // ? SENDING ERROR IF GOT
  if (!validatedFields.success) {
    const fieldErrors = {};

    validatedFields.error.issues.forEach((issue) => {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
        // console.log( issue);
      }
    });

    console.log("D A T A -- E R R O R :::: ", fieldErrors);

    return {
      errors: fieldErrors,
      title: formData.get("title")?.toString() ?? "",
      slug: formData.get("slug")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      tag: formData.get("tag")?.toString() ?? "",
      category: formData.get("category")?.toString() ?? "",
    };
  }
  const data = {
    title: validatedFields.data.title,
    excerpt: validatedFields.data.description,
    content: validatedFields.data.content,
    slug: validatedFields.data.slug,
    tags: validatedFields.data.tag,
    category: validatedFields.data.slug,
    status: "draft",
    author: token.user.id,
  };

  console.log("data befor ::: ", data, "ID ID ::: ", state.id);

  const res = await updatingPost(
    {
      title: validatedFields.data.title,
      excerpt: validatedFields.data.description,
      content: validatedFields.data.content,
      slug: validatedFields.data.slug,
      tags: [validatedFields.data.tag],
      category: [validatedFields.data.slug],
      status: "draft",
      author: token.user.id,
    },
    state.id
  );

  console.log("RESULTS FROM UPDATING POST :: ", res);

  // const res = await creatingCAtegories(validatedFields.data);
  // console.log("CATE get action res", res);

  if (res.title) {
    return {
      success: true,
      message: "Creer avec succee!",
    };
  }

  return {
    success: false,
    message: "Une erreur est survenue",
  };
  // return res;
}
