import { toast } from "react-toastify";

export default function ToastHelper(
  message: string,
  success?: boolean,
  failure?: boolean
) {
  if (success) return toast.success(message);
  if (failure) return toast.error(message);
}
