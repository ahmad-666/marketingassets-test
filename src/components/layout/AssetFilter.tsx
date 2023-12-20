import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import TextField from "@/src/components/common/form/TextField";
import AutoComplete from "@/src/components/common/form/AutoComplete";
import Icon from "@/src/components/common/Icon";
import Button from "@/src/components/common/Button";
import type { Option } from "@/src/types/Common";

const typeOptions: Option[] = [
  {
    value: "emoji",
    label: "Emoji",
  },
  {
    value: "logo",
    label: "Logo",
  },
];
export default function AssetFilter() {
  const router = useRouter();
  const [type, setType] = useState(typeOptions[0]);
  const [search, setSearch] = useState("");
  const readUrlQueries = useCallback(() => {
    const { type, search } = router.query;
    const typeQuery = type as string;
    const searchQuery = search as string;
    setType(typeOptions.find((o) => o.value === typeQuery) || typeOptions[0]);
    setSearch(searchQuery || "");
  }, [router.query]);
  const setUrlQueries = useCallback(() => {
    let url: null | string = null;
    if (type.value === "emoji") url = "/emojis";
    else if (type.value === "logo") url = "/logos";
    else throw new Error("Invalid type!!!");
    router.replace(
      {
        pathname: url,
        query: Object.fromEntries([["search", search]].filter((elm) => elm[1])),
      },
      undefined,
      { scroll: false }
    );
  }, [router, search, type]);
  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setUrlQueries();
    },
    [setUrlQueries]
  );
  useEffect(() => {
    readUrlQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-3 position-relative w-100 shadow p-2 p-md-4"
      >
        <ul className="row justify-content-center g-3">
          <li className="col-12 col-sm-4">
            <AutoComplete
              value={type}
              onChange={(newType) => setType(newType)}
              options={typeOptions}
              label="Asset"
              placeholder="Select Asset..."
              hideDetails
            />
          </li>
          <li className="col-12 col-sm-4">
            <TextField
              value={search}
              onChange={(newSearch) => setSearch(newSearch)}
              label="Term"
              placeholder="Enter Search Term..."
              hideDetails
            />
          </li>
          <li className="col-12 col-sm-3 d-flex align-items-end">
            <Button
              type="submit"
              size="lg"
              className="fw-bold w-100"
              color="primary"
              variant="filled"
            >
              <Icon icon="mdi:search" size="md" className="text-dark-color" />
              Search
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
