import { useContext } from "react";
import { SnackbarContext } from "@/src/providers/Snackbar";

const useSnackbar = () => {
  const {
    show,
    setShow,
    type,
    setType,
    closable,
    setClosable,
    timeout,
    setTimeout,
    message,
    setMessage,
  } = useContext(SnackbarContext);
  return {
    show,
    setShow,
    type,
    setType,
    closable,
    setClosable,
    timeout,
    setTimeout,
    message,
    setMessage,
  };
};
export default useSnackbar;
