import { useState, useEffect } from "react";
import useUrlQuery from "./useUrlQuery";

const defaultName = "";
const defaultAge = 0;
const defaultIsValid = false;
const defaultPrice = [100, 200];
const defaultNames = [];
const defaultAges = [];
export default function UseUrlQuery() {
  const [name, setName] = useState(defaultName);
  const [age, setAge] = useState(defaultAge);
  const [isValid, setIsValid] = useState(defaultIsValid);
  const [price, setPrice] = useState(defaultPrice);
  const [names, setNames] = useState<string[]>(defaultNames);
  const [ages, setAges] = useState<number[]>(defaultAges);
  const { getUrlQuery, setUrlQuery } = useUrlQuery({
    queries: [
      {
        type: "string",
        name: "name",
        defaultValue: defaultName,
        value: name,
      },
      {
        type: "number",
        name: "age",
        defaultValue: defaultAge,
        value: age,
      },
      {
        type: "boolean",
        name: "isValid",
        defaultValue: defaultIsValid,
        value: isValid,
      },
      {
        type: "range",
        name: "price",
        defaultValue: defaultPrice,
        value: price,
      },
      {
        type: "string-array",
        name: "names",
        defaultValue: defaultNames,
        value: names,
      },
      {
        type: "number-array",
        name: "ages",
        defaultValue: defaultAges,
        value: ages,
      },
    ],
    generateDefaultQueries: false,
    mode: "replace",
    scroll: false,
  });
  useEffect(() => {
    //only run at mount
    const queries = getUrlQuery();
    setName(
      (queries.find((q) => q.name === "name")?.value as string) || defaultName
    );
    setAge(
      (queries.find((q) => q.name === "age")?.value as number) || defaultAge
    );
    setIsValid(
      (queries.find((q) => q.name === "isValid")?.value as boolean) ||
        defaultIsValid
    );
    setPrice(
      (queries.find((q) => q.name === "price")?.value as number[]) ||
        defaultPrice
    );
    setNames(
      (queries.find((q) => q.name === "names")?.value as string[]) ||
        defaultNames
    );
    setAges(
      (queries.find((q) => q.name === "ages")?.value as number[]) || defaultAges
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>
        {name}-{age}-{JSON.stringify(isValid)}-{JSON.stringify(price)}-
        {JSON.stringify(names)}-{JSON.stringify(ages)}
      </h1>
      <button onClick={() => setName("new name")}>change name</button>
      <button onClick={() => setAge(10)}>change age</button>
      <button onClick={() => setIsValid(true)}>change isValid</button>
      <button onClick={() => setPrice([200, 300])}>change price</button>
      <button onClick={() => setNames(["a", "b"])}>change names</button>
      <button onClick={() => setAges([10, 20])}>change ages</button>
      <button onClick={() => setUrlQuery()}>generate query</button>
    </div>
  );
}
