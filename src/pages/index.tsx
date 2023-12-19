import MetaData from "@/src/components/common/MetaData";
import { useState } from "react";
import TextField from "../components/common/form/TextField";
import Select from "../components/common/form/Select";

export default function Page() {
  const [name, setName] = useState("");
  const [val, setVal] = useState(null);
  return (
    <div>
      <MetaData />
      <h1>Home</h1>
      {/* <TextField
        value={name}
        onChange={(newVal) => setName(newVal)}
        placeholder="name"
        label="name"
      />
      <Select
        value={val}
        onChange={(newVal) => setVal(newVal)}
        placeholder="job"
        label="job"
        options={[{ label: "JOB", value: "job" }]}
      /> */}
    </div>
  );
}
