"use server";

import {
  LoginAuthSchema,
  RegisterAuthSchema,
} from "../../models/rules/auth_roules";
import {
  gettingAuthMe,
  loginAuth,
  registeringAuth,
} from "../../services/auth/auth_service.";

export async function registerAuthAction(state, formData) {
  console.log("form step one action auth client side --");

  //? VALIDATING THE FORM DATA
  const validatedFields = RegisterAuthSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    password_confirmation:
      formData.get("password_confirmation")?.toString() ?? "",
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

    // console.log("D A T A -- E R R O R :::: ", fieldErrors);

    return {
      errors: fieldErrors,
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
    };
  }

  const res = await registeringAuth(validatedFields.data);
  console.log("RESULT FROM REGISTER USER ACTION <--===--> ", res);

  if (res.token) {
    return {
      success: true,
      message: "Succees!",
    };
  }

  return {
    success: false,
    message: "Oupss!",
  };
}

export async function loginAuthAction(state, formData) {
  console.log("LOGIN IN AUTH");

  //? VALIDATING THE FORM DATA
  const validatedFields = LoginAuthSchema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  });

  console.log("valide DATA  --> ", validatedFields);

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
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };
  }

  const res = await loginAuth(validatedFields.data);

  console.log("RES FORM CLIENT FORM :: ", res);

  if (res.token) {
    return {
      success: true,
      message: "Connecté avec succée!",
    };
  }

  return {
    success: false,
    message: res.message,
  };
}

export async function getAuthMe() {
  try {
    const res = await gettingAuthMe();
    return res;
  } catch (error) {
    console.log("went bad on getting auth on client side:: ", error);
  }
}
