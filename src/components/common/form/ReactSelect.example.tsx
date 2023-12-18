import { useState, useEffect, useRef } from "react";
import {
  default as ReactSelect, //main component that we use
  components, //gives us components.Option,components.SingleValue,components.Control,... useful when we are using 'components' prop on <ReactSelect />
  type Props, //all props that we can use on <ReactSelect />
  type SelectInstance, //useful for typescript of 'ref'
  type ControlProps, //useful for typescript of components:{{Control}}
  type OptionProps, //useful for typescript of components:{{Option}}
  type SingleValueProps, //useful for typescript of components:{{SingleValue}}
  type StylesConfig, //useful for typescript when we use 'styles' prop
  type ClassNamesConfig, //useful for times we use 'classNames' prop
} from "react-select";

//in react-select there are times we need to generics for ts and generic is in <OptionType,MultipleType,GroupType> format
//by default each option should have {value,label} but we can change this behavior
//if we only need change text of each option in ui: getOptionLabel={option=>option.newLabel}
//if we only need style changes we use 'classNames', or 'styles' prop but if we need to change jsx of part of react-select we should use 'components' prop
//list of keys for classNames,styles,components props:
//clearIndicator,container,control,dropdownIndicator,placeholder,singleValue,group,groupHeading,indicatorsContainer,indicatorSeparator,valueContainer,input,loadingIndicator,loadingMessage,noOptionsMessage,option,menu,menuList,menuPortal,multiValue,multiValueLabel,multiValueRemove
//When defining replacement components, it is important to do so outside the scope of rendering the Select:
// Bad
{
  /* <Select {...props} components={{
    Control: ({ children, ...rest }) => (
        <components.Control {...rest}>{children}</components.Control>
    )}}
/> */
}
// Good:
{
  /*
const Control = ({ children, ...props }) => (
	<components.Control {...props}>{children}</components.Control>
);
const GoodSelect = props => <Select {...props} components={{ Control }} />
*/
}
//some of important react-select props:
//name,id,inputId,ref,className,classNames(object with certain keys),styles(object with certain keys),theme,tabIndex,classNamePrefix(add prefix to all generated css classes)
//defaultValue(uncontrolled),defaultInputValue(uncontrolled),value(controlled),inputValue(controlled)
//options,filterOption,formatOptionLabel
//getOptionLabel(for show in ui , default to 'label' key of each option),getOptionValue(for compare between options and identify which options are selected,default to 'value' key of each option)
//isLoading,isClearable,isDisabled,isMulti,isRtl,isSearchable,placeholder
//closeMenuOnSelect,delimiter,minMenuHeight,maxMenuHeight,menuPlacement,menuPosition,menuPortalTarget,menuShouldScrollIntoView,openMenuOnFocus,openMenuOnClick,pageSize,hideSelectedOptions
//components(for override default react-select components e.g adding new loader component)
//noOptionsMessage,loadingMessage
//onBlur,onFocus,onChange,onInputChange,onKeyDown,

type Option = {
  value: number;
  text: string;
  label: string;
};
const options: Option[] = [
  {
    value: 1,
    text: "HTML",
    label: "HTML-L",
  },
  {
    value: 2,
    text: "CSS",
    label: "CSS-L",
  },
];

const Control = ({ children, ...rest }: ControlProps<Option, false>) => {
  return (
    <components.Control {...rest}>
      <p>prepend</p>
      {children}
      <p>append</p>
    </components.Control>
  );
};
const Option = ({ children, data, ...rest }: OptionProps<Option, false>) => {
  return (
    <components.Option data={data} {...rest}>
      {children} - {data.value}
    </components.Option>
  );
};
const SingleValue = ({
  children,
  data,
  ...rest
}: SingleValueProps<Option, false>) => {
  return (
    <components.SingleValue data={data} {...rest}>
      {children}-{data.value}
    </components.SingleValue>
  );
};
const styles: StylesConfig<Option, false> = {
  option: (baseStyle, state) => ({
    ...baseStyle,
    backgroundColor: state.isFocused ? "red" : "#0f0",
  }),
};
const classNames: ClassNamesConfig<Option, false> = {
  option: (props) => (props.isFocused ? "bg-primary" : "bg-secondary"),
};

export default function Example() {
  const [val, setVal] = useState<null | Option>(null); //whole selected option will go to select
  const elm = useRef<SelectInstance<Option, false>>(null!);
  useEffect(() => {
    elm.current.openMenu("first");
  }, []);
  return (
    <div>
      <ReactSelect
        ref={elm}
        value={val}
        options={options}
        onChange={(option) => {
          setVal(option);
        }}
        // getOptionLabel={(option) => `${option.text}-${option.label}`}
        // getOptionValue={(option) => option.value}
        styles={styles}
        classNames={classNames}
        components={{
          Control,
          Option,
          SingleValue,
          //Option,Control
          //ValueContainer,SingleValue,
          // SelectContainer,Menu,MenuList,Input
          // MultiValueContainer,MultiValue,MultiValueLabel
          // NoOptionsMessage,LoadingMessage,LoadingIndicator,ClearIndicator,Placeholder
        }}
      />
    </div>
  );
}
