import MetaData from "@/src/components/common/MetaData";
import Select from "../components/common/form/Select";
import { useState } from "react";

type Option = {
  value: string;
  label: string;
};
const options: Option[] = [
  {
    label: "text",
    value: "value",
  },
];
export default function Page() {
  const [val, setVal] = useState(null);
  return (
    <div>
      <MetaData />
      <h1>Home</h1>
      <Select
        label="label"
        placeholder="placeholder"
        value={val}
        onChange={(newVal) => setVal(newVal)}
        options={options}
      />
    </div>
  );
}
