import {
  useState,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import Snackbar, {
  type Type as SnackbarType,
} from "@/src/components/common/Snackbar";

type SnackbarContextType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  type: SnackbarType;
  setType: Dispatch<SetStateAction<SnackbarType>>;
  closable: boolean;
  setClosable: Dispatch<SetStateAction<boolean>>;
  timeout: number;
  setTimeout: Dispatch<SetStateAction<number>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};
type SnackbarProviderProps = {
  children: ReactNode;
};
export const SnackbarContext = createContext<SnackbarContextType>({
  show: false,
  setShow: () => {},
  type: "success",
  setType: () => {},
  closable: true,
  setClosable: () => {},
  timeout: 4000,
  setTimeout: () => {},
  message: "",
  setMessage: () => {},
});
const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<SnackbarType>("success");
  const [closable, setClosable] = useState(true);
  const [timeout, setTimeout] = useState(4000);
  const [message, setMessage] = useState("");
  return (
    <SnackbarContext.Provider
      value={{
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
      }}
    >
      <Snackbar
        show={show}
        onChange={(newValue) => setShow(newValue)}
        type={type}
        closable={closable}
        timeout={timeout}
      >
        <p className="text-white fz14">{message}</p>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
