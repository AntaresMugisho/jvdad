"use client";

import { useState, useEffect, useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Lock } from "lucide-react";
import { loginAuthAction } from "@/actions/auth/auth_action";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ToastHelper from "@/utils/toast_helper";
import { ToastContainer } from "react-toastify";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const [state, action, isPending] = useActionState(loginAuthAction, {
    errors: {},
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state.success) {
      ToastHelper(state.message, true, false);
      router.push("/dashboard");
    } else {
      ToastHelper(state.message, false, true);
    }
  }, [state]);

  console.log("STATE :: ", state);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ToastContainer />
      <div className="w-full rounded-md max-w-md p-8 shadow-xl shadow-slate-400/30 ">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold">AHDI asbl</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Authentifiez-vous
          </p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type={visible ? "text" : "password"}
              placeholder="••••••••"
              required
            />

            {visible ? (
              <FaEyeSlash
                onClick={() => setVisible(!visible)}
                className="absolute top-8 right-2 text-xl cursor-pointer "
              />
            ) : (
              <FaEye
                onClick={() => setVisible(!visible)}
                className="absolute top-8 right-2 text-xl cursor-pointer "
              />
            )}
          </div>

          {isPending ? (
            <div className="border-b-2 mx-auto animate-spin border-green-500 h-6 w-6 rounded-full" />
          ) : (
            <button
              type="submit"
              className="w-full bg-green-500 py-1 text-white transition-all duration-300 hover:opacity-70 "
            >
              Se connecter
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
