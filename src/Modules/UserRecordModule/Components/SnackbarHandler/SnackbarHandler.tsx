import { toast } from "react-toastify";

class SnackbarHandler {
  errorToast = (text: string) => {
    toast(text, {
      position: "bottom-center",
      type: "error",
      style: {
        background: "#FE0303",
        color: "#fff",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "15px",
      },
    });
  };

  successToast = (text: string) => {
    toast(text, {
      position: "bottom-center",
      type: "success",
      style: {
        background: "#88B13E",

        color: "#fff",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "15px",
      },
    });
  };
}

export default new SnackbarHandler();
