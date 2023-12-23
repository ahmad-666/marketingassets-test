import {
  useState,
  useMemo,
  useCallback,
  useId,
  forwardRef,
  type CSSProperties,
} from "react";
import FormLabel from "@/src/components/common/form/FormLabel";
import InputMessage from "@/src/components/common/form/InputMessage";
import useColor from "@/src/hooks/useColor";

type Type = "text" | "number" | "email" | "tel" | "password";
type Variant = "filled" | "outlined";
type TextFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  label?: string;
  variant?: Variant;
  disabled?: boolean;
  type?: Type;
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
    value,
    onChange,
    placeholder,
    disabled = false,
    label,
    variant = "outlined",
    type = "text",
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
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const parsedColor = useColor(color);
  const parsedBgColor = useColor(bgColor);
  const parsedTextColor = useColor(textColor);
  const generatedId = useId();
  const [isFocus, setIsFocus] = useState(false);
  const sizingStyle = useMemo<React.CSSProperties>(() => {
    return {
      height: dense ? "35px" : "50px",
    };
  }, [dense]);
  const coloringStyle = useMemo<React.CSSProperties>(() => {
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
  const focusHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
  }, []);
  const blurHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
  }, []);
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      onChange(newVal);
    },
    [onChange]
  );
  return (
    <div className={`${disabled ? "opacity-50" : ""} ${className}`}>
      {label && (
        <FormLabel label={label} inputId={id || generatedId} className="mb5" />
      )}
      <input
        ref={ref}
        value={value}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        placeholder={placeholder}
        id={id || generatedId}
        name={name}
        type={type}
        disabled={disabled}
        className={`d-block w-100 px10 rounded-3 fz16 appearance-none outline-none ${inputClassName}`}
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
