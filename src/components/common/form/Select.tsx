import { useMemo, useCallback, useId, forwardRef } from "react";
import {
  default as ReactSelect,
  type StylesConfig,
  type ClassNamesConfig,
  type Theme,
  type ThemeConfig,
  type SelectInstance,
} from "react-select";
import InputMessage from "@/src/components/common/form/InputMessage";
import FormLabel from "@/src/components/common/form/FormLabel";

type ReactSelectProps = Omit<
  React.ComponentProps<typeof ReactSelect>,
  "value" | "options" | "onChange" | "getOptionLabel" | "className"
>;
type SelectProps<Value, Option> = {
  value: Value;
  options: Option[];
  label?: string;
  onChange: (newValue: Value) => void;
  getOptionLabel?: (option: Option) => string;
  error?: string;
  hint?: string;
  hideDetails?: boolean;
  dense?: boolean;
  color?: string;
  selectClassName?: string;
  className?: string;
} & ReactSelectProps;

const Select = <Value, Option>(
  {
    value,
    options = [],
    label,
    onChange,
    getOptionLabel,
    id,
    inputId,
    instanceId,
    error,
    hint,
    hideDetails = false,
    dense = false,
    color = "#f5c34b",
    styles,
    theme,
    classNames,
    selectClassName = "",
    className = "",
    ...rest
  }: SelectProps<Value, Option>,
  ref: React.ForwardedRef<SelectInstance>
) => {
  const generatedId = useId();
  //   const denseStyles = useMemo<StylesConfig>(() => {
  //     return {
  //       control: (baseStyle, state) => ({
  //         ...baseStyle,
  //         minHeight: "35px",
  //       }),
  //     };
  //   }, []);
  //   const nonDenseStyles = useMemo<StylesConfig>(() => {
  //     return {
  //       control: (baseStyle, state) => ({
  //         ...baseStyle,
  //         minHeight: "50px",
  //       }),
  //     };
  //   }, []);
  const customClassNames = useMemo<ClassNamesConfig>(() => {
    return {
      placeholder: (state) => "fz14",
      container: (state) => "fz16",
    };
  }, []);
  const customTheme: ThemeConfig = useCallback(
    (theme: Theme) => {
      return {
        ...theme,
        //borderRadius: 10,
        spacing: {
          ...theme.spacing,
          controlHeight: dense ? 35 : 50,
          //baseUnit,menuGutter
        },
        colors: {
          ...theme.colors,
          primary: color,
          primary25: `${color}22`,
          primary50: `${color}66`,
          primary75: `${color}aa`,
        },
      };
    },
    [dense, color]
  );

  return (
    <div className={`${className}`}>
      {label && (
        <FormLabel
          inputId={inputId || `input-${generatedId}`}
          label={label}
          className="mb5"
        />
      )}
      <ReactSelect
        id={id || generatedId}
        inputId={inputId || `input-${generatedId}`}
        instanceId={instanceId || `instance-${generatedId}`}
        ref={ref}
        value={value}
        options={options}
        onChange={onChange}
        //styles={styles || (dense ? denseStyles : nonDenseStyles)}
        classNames={classNames || customClassNames}
        theme={theme || customTheme}
        getOptionLabel={getOptionLabel}
        className={`${selectClassName}`}
        {...rest}
      />
      {!hideDetails && (
        <InputMessage className="mt5" error={error} hint={hint} />
      )}
    </div>
  );
};

export default forwardRef(Select) as <Value, Option>(
  props: SelectProps<Value, Option> & {
    ref?: React.ForwardedRef<SelectInstance>;
  }
) => ReturnType<typeof Select>;
