import { useState, useCallback, useId, forwardRef } from "react";
import FormLabel from "@/src/components/common/form/FormLabel";
import InputMessage from "@/src/components/common/form/InputMessage";

type Type = "text" | "number" | "email" | "tel" | "password";
type TextFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  type?: Type;
  name?: string;
  id?: string;
  error?: string;
  hint?: string;
  hideDetails?: boolean;
  dense?: boolean;
  color?: string;
  inputClassName?: string;
  className?: string;
};

const TextField = (
  {
    value,
    onChange,
    placeholder,
    disabled = false,
    label,
    type = "text",
    name,
    id,
    error,
    hint,
    hideDetails = false,
    dense = false,
    color = "#f5c34b",
    inputClassName = "",
    className = "",
  }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const generatedId = useId();
  const [isFocus, setIsFocus] = useState(false);
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
        className={`d-block w-100 appearance-none outline-none bg-white fz16 text-dark-color rounded-3 px10 transition-0-2-eio ${inputClassName}`}
        style={{
          height: dense ? "35px" : "50px",
          border: isFocus ? `2px solid ${color}` : "1px solid #eaeaea",
        }}
      />
      {!hideDetails && (
        <InputMessage error={error} hint={hint} className="mt5" />
      )}
    </div>
  );
};
export default forwardRef(TextField);
