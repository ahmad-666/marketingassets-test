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
type AutoCompleteProps<Value, Option> = {
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

const AutoComplete = <Value, Option>(
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
  }: AutoCompleteProps<Value, Option>,
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
    //instead of theme we could work with it , inside state we have isFocus,isDisabled,...
    //with proper combination of styles,classNames,theme prop we can create any custom style that we want
    return {
      container: (state) => "fz16",
      control: (state) => "rounded-3",
      input: (state) => "text-dark-color",
      singleValue: (state) => "text-dark-color",
      multiValue: (state) => "text-dark-color",
      placeholder: (state) => "fz14 text-body-color text-capitalize",
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
          primary: color, //borderColor on focus + bg of selected option
          primary25: `${color}33`, //bg of hover option
          primary50: `${color}66`,
          primary75: `${color}aa`,
          //neutral0: "transparent", //bg of container, can be used if we want to create filled variant
          neutral20: "#eaeaea", //borderColor on blur
          neutral30: "#eaeaea", //borderColor when blur + hover
          //we have:
          //primary,primary75,primary50,primary25
          //danger,dangerLight
          //neutral0,neutral5,neutral10,neutral20,neutral30,neutral40,neutral50,neutral60,neutral70,neutral80,neutral90
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

export default forwardRef(AutoComplete) as <Value, Option>(
  props: AutoCompleteProps<Value, Option> & {
    ref?: React.ForwardedRef<SelectInstance>;
  }
) => ReturnType<typeof AutoComplete>;
