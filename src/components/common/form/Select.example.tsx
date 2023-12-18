import Select from "@/src/components/common/form/Select";
import { useEffect, useRef, useState } from "react";
import { type SelectInstance } from "react-select";

type Option = {
  value: number;
  text: string;
};
const options: Option[] = [
  {
    value: 1,
    text: "first",
  },
  {
    value: 2,
    text: "second",
  },
];
export default function Example() {
  const [val1, setVal1] = useState<null | Option>(null);
  const [val2, setVal2] = useState<Option[]>([]);
  const elm = useRef<SelectInstance<Option, false>>(null!);
  useEffect(() => {
    console.log(elm.current.openMenu("first"));
  }, []);
  return (
    <div>
      <Select
        ref={elm}
        value={val1}
        onChange={(option) => {
          setVal1(option);
        }}
        options={options}
        getOptionLabel={(option) => option.text}
        error="error"
        hint="hint"
      />
      <Select
        value={val2}
        onChange={(option) => {
          setVal2(option);
        }}
        options={options}
        isMulti
        getOptionLabel={(option) => option.text}
      />
    </div>
  );
}
