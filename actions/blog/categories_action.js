"use server";

import {
  creatingCAtegories,
  gettingCategories,
} from "@/services/blog/categories";

import { categoryShema } from "../../models/rules/posts_roules";

export async function getCategoriesAction() {
  console.log("ACTION GET CAT");

  try {
    const res = await gettingCategories();
    // console.log("Categories get action res", res);

    return res;
  } catch (error) {
    console.log("went wrong when getting categories action", error);
  }
}

export async function createCategory(state, formData) {
  console.log("Create category action --");

  //? VALIDATING THE FORM DATA
  const validatedFields = categoryShema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
  });

  //   console.log("D A T A  FORM :::: ", validatedFields);

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
      name: formData.get("name")?.toString() ?? "",
      slug: formData.get("slug")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
    };
  }

  const res = await creatingCAtegories(validatedFields.data);
  console.log("CATE get action res", res);

  if (res.name) {
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
