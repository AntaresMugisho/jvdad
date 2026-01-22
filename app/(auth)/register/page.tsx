"use client";

import { FaLock, FaUser } from "react-icons/fa6";
import { RiMvAiLine } from "react-icons/ri";
import { MdOutlinePassword } from "react-icons/md";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { registerAuthAction } from "@/actions/auth/auth_action";
import ToastHelper from "@/utils/toast_helper";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
} as any;

export default function RegisterPage() {
  const [visible, setVisible] = useState(false);
  const [visibleConf, setVisibleConf] = useState(false);

  const router = useRouter();

  const [state, action, isPending] = useActionState(
    registerAuthAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      ToastHelper(state.message, true, false);

      router.push("/");
    }
    if (!state.success) {
      ToastHelper(state.message, false, true);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 ">
      <div className="w-[90vw] min-h-[60vh] shadow-xl shadow-green-800/10 rounded-sm flex flex-col gap-4 md:w-[50vw] lg:w-[30vw] ">
        {/* // ? Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
            <FaUser className="h-6 w-6 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold">AHDI</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Commencez par vous identifiez
          </p>
        </div>

        {/* //? FORMULAR */}
        <form action={action} className="space-y-3 px-6 py-8">
          {/* //? name */}
          <div className="w-full flex flex-col ">
            <label htmlFor="email">Noms</label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={state?.name}
              placeholder="Votre nom"
              className={`p-2 text-lg w-full outline-none focus:border-green-500 border border-gray-400 rounded-sm ${
                state?.errors && state?.errors?.name
                  ? "border-red-500"
                  : "border-gray-400"
              } `}
            />
            {state?.errors && state?.errors?.name && (
              <div className="text-red-500 w-full">{state?.errors?.name}</div>
            )}
          </div>
          {/* //? email */}
          <div className="w-full flex flex-col relative ">
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={state?.email}
              placeholder="exemple@email.com"
              className={`p-2 text-lg w-full outline-none focus:border-green-500 border border-gray-400 rounded-sm pl-12 ${
                state?.errors && state?.errors?.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <div className="flex items-center gap-2  absolute top-9 left-2 ">
              <MdAlternateEmail className="text-2xl text-[#111]" />
              <div className="h-4 w-px bg-gray-600" />
            </div>
            {state?.errors && state?.errors?.email && (
              <div className="text-red-500 w-full">{state?.errors?.email}</div>
            )}
          </div>
          {/* //? password */}
          <div className="w-full flex flex-col relative ">
            <label htmlFor="email">Mot de pass</label>
            <input
              id="passord"
              type={visible ? "text" : "password"}
              name="password"
              placeholder="mot secret"
              className={`p-2 text-lg w-full outline-none focus:border-green-500 border rounded-sm pl-12 ${
                state?.errors && state?.errors?.password
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <div className="flex items-center gap-2  absolute top-9 left-2 ">
              <MdOutlinePassword className="text-2xl text-[#111]" />
              <div className="h-4 w-px bg-gray-600" />
            </div>

            {/* //? visible icon */}
            <div
              onClick={() => setVisible(!visible)}
              className=" absolute right-2 top-9 cursor-pointer "
            >
              {visible ? (
                <FaEyeSlash className="text-2xl text-[#111] " />
              ) : (
                <FaRegEye className="text-2xl text-[#111] " />
              )}
            </div>

            {state?.errors && state?.errors?.password && (
              <div className="text-red-500 w-full">
                {state?.errors?.password}
              </div>
            )}
          </div>
          {/* //? pass confirm */}
          <div className="w-full flex flex-col relative ">
            <label htmlFor="email">Confirmer le pass</label>
            <input
              id="passord"
              type={visibleConf ? "text" : "password"}
              name="password_confirmation"
              placeholder="confirmer le mot secret"
              className={`p-2 text-lg w-full outline-none focus:border-green-500 border rounded-sm pl-12 ${
                state?.errors && state?.errors?.password_confirmation
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <div className="flex items-center gap-2  absolute top-9 left-2 ">
              <MdOutlinePassword className="text-2xl text-[#111]" />
              <div className="h-4 w-px bg-gray-600" />
            </div>

            {/* //? visible icon */}
            <div
              onClick={() => setVisibleConf(!visibleConf)}
              className=" absolute right-2 top-9 cursor-pointer "
            >
              {visibleConf ? (
                <FaEyeSlash className="text-2xl text-[#111] " />
              ) : (
                <FaRegEye className="text-2xl text-[#111] " />
              )}
            </div>

            {state?.errors && state?.errors?.password_confirmation && (
              <div className="text-red-500 w-full">
                {state?.errors?.password_confirmation}
              </div>
            )}
          </div>

          {isPending ? (
            <div className="w-full flex justify-center items-center pr-2 ">
              <div className="animate-spin rounded-full h-8 w-8 border-l-green-600 border-l-3 border-b-3 border-b-green-500 " />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full rounded-md bg-green-500 text-white text-lg py-1.5 "
            >
              S'inscrire
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
