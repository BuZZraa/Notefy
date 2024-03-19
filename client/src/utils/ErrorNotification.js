import { toast } from "react-toastify";

export default function errorNotification(errorMessage) {
    toast.error(errorMessage, {
    toastId: errorMessage,
    closeOnClick: true,
    theme: "colored"
    });
}