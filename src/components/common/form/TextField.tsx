import {
  useState,
  useMemo,
  useCallback,
  useId,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type FocusEvent,
  type FormEvent,
  type ChangeEvent,
} from "react";
import FormLabel from "@/src/components/common/form/FormLabel";
import InputMessage from "@/src/components/common/form/InputMessage";
import useColor from "@/src/hooks/useColor";

type As = "textfield" | "textarea";
type Type = "text" | "number" | "email" | "tel" | "password";
type Variant = "filled" | "outlined";

type TextFieldProps = {
  as?: As;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  label?: string;
  variant?: Variant;
  type?: Type;
  autoGrow?: boolean;
  minHeight?: number;
  disabled?: boolean;
  name?: string;
  id?: string;
  error?: string;
  hint?: string;
  hideDetails?: boolean;
  dense?: boolean;
  color?: string;
  bgColor?: string;
  textColor?: string;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  className?: string;
};
const TextField = (
  {
    as = "textfield",
    value,
    onChange,
    placeholder,
    disabled = false,
    label,
    variant = "outlined",
    type = "text",
    autoGrow = true,
    minHeight = 150,
    name,
    id,
    error,
    hint,
    hideDetails = false,
    dense = false,
    color = "primary",
    bgColor = "white",
    textColor = "dark",
    inputClassName = "",
    inputStyle = {},
    className = "",
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement> | ForwardedRef<HTMLTextAreaElement>
) => {
  const parsedColor = useColor(color);
  const parsedBgColor = useColor(bgColor);
  const parsedTextColor = useColor(textColor);
  const generatedId = useId();
  const [isFocus, setIsFocus] = useState(false);
  const Component = useMemo(() => {
    return as === "textfield" ? "input" : "textarea";
  }, [as]);
  const sizingStyle = useMemo<CSSProperties>(() => {
    let height = "auto";
    let minHeightStyle = "auto";
    if (as === "textfield") {
      height = dense ? "35px" : "50px";
    } else if (as === "textarea") {
      minHeightStyle = `${minHeight}px`;
    }
    return {
      height,
      minHeight: minHeightStyle,
    };
  }, [as, dense, minHeight]);
  const coloringStyle = useMemo<CSSProperties>(() => {
    let color = parsedTextColor;
    let backgroundColor = "";
    let border = "";
    if (variant === "filled") {
      backgroundColor = parsedBgColor;
      border = isFocus ? `2px solid ${parsedColor}` : "none";
    } else if (variant === "outlined") {
      backgroundColor = "transparent";
      border = isFocus ? `2px solid ${parsedColor}` : "1px solid #eaeaea";
    }
    return {
      color,
      backgroundColor,
      border,
    };
  }, [variant, isFocus, parsedColor, parsedTextColor, parsedBgColor]);
  const focusHandler = useCallback(
    (e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => {
      setIsFocus(true);
    },
    []
  );
  const blurHandler = useCallback(
    (e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => {
      setIsFocus(false);
    },
    []
  );
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const newVal = e.target.value;
      onChange(newVal);
    },
    [onChange]
  );
  const inputHandler = useCallback(
    (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
      if (as === "textarea" && autoGrow) {
        const elm = e.target as HTMLElement;
        elm.style.height = "auto";
        elm.style.height = `${elm.scrollHeight}px`;
      }
    },
    [as, autoGrow]
  );
  return (
    <div className={`${disabled ? "opacity-50" : ""} ${className}`}>
      {label && (
        <FormLabel label={label} inputId={id || generatedId} className="mb5" />
      )}
      <Component
        ref={ref as any}
        value={value}
        onChange={changeHandler}
        onInput={inputHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        placeholder={placeholder}
        id={id || generatedId}
        name={name}
        type={as === "textfield" ? type : undefined}
        disabled={disabled}
        className={`d-block w-100 px10 rounded-3 fz16 appearance-none outline-none ${
          as === "textarea" ? "py10 resize-none" : ""
        } ${inputClassName}`}
        style={{
          ...sizingStyle,
          ...coloringStyle,
          ...inputStyle,
        }}
      />
      {!hideDetails && (
        <InputMessage error={error} hint={hint} className="mt5" />
      )}
    </div>
  );
};
export default forwardRef(TextField);
