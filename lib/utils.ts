import { toast } from "react-toastify";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function gettingDate(iso: string) {
  const date = new Date(iso);

  return date.toLocaleDateString();
}

export function gettingHour(iso: string) {
  const date = new Date(iso);

  return date.toLocaleTimeString();
}


export function ToastHelper(
  message: string,
  success?: boolean,
  failure?: boolean
) {
  if (success) return toast.success(message);
  if (failure) return toast.error(message);
}


export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
