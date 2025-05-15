import toast from "react-hot-toast";

type NotifierTypes = {
  message?: string;
  type: "success" | "error";
};
export const notifier = ({ message = "", type }: NotifierTypes) => {
  const types = ["success", "error"];
  if (!types.includes(type)) return;

  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
  }
};
