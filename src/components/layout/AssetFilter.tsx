import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import TextField from "@/src/components/common/form/TextField";
// import AutoComplete from "@/src/components/common/form/AutoComplete";
import Icon from "@/src/components/common/Icon";
import Button from "@/src/components/common/Button";
import type { Option } from "@/src/types/Common";

type Type = Option & {
  prefix: string;
};
type AssetFilterProps = {
  className?: string;
};
const typeOptions: Type[] = [
  {
    value: "emoji",
    label: "Emoji",
    prefix: "emoji",
  },
  {
    value: "logo",
    label: "Logo",
    prefix: "logo",
  },
];
export default function AssetFilter({ className = "" }: AssetFilterProps) {
  const router = useRouter();
  const [type, setType] = useState(typeOptions[0]);
  const [search, setSearch] = useState("");
  const readUrlQueries = useCallback(() => {
    const { pathname, query } = router;
    const { search } = query;
    const typePrefix = pathname.includes("/logos") ? "logo" : "emoji";
    const searchQuery = search as string;
    setType(typeOptions.find((o) => o.prefix === typePrefix) || typeOptions[0]);
    setSearch(searchQuery || "");
  }, [router]);
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
    <div className={`${className}`}>
      <ul className="d-flex justify-content-center gap-3 mb0">
        {typeOptions.map((typeOption) => (
          <li key={typeOption.value}>
            <Button
              size="lg"
              color={typeOption.value === type.value ? "primary" : "white"}
              onClick={() => setType(typeOption)}
              className="fw-bold"
              hover={false}
            >
              {typeOption.label}
            </Button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-3 position-relative w-100 shadow p-2 p-md-4 mtn5"
      >
        <ul className="row justify-content-center g-3">
          {/* <li className="col-12 col-sm-4">
            <AutoComplete
              value={type}
              onChange={(newType) => setType(newType)}
              options={typeOptions}
              label="Asset"
              placeholder="Select Asset..."
              hideDetails
            />
          </li> */}
          <li className="col-8 col-md-9">
            <TextField
              value={search}
              onChange={(newSearch) => setSearch(newSearch)}
              label="Search"
              placeholder="Enter Search Term..."
              hideDetails
            />
          </li>
          <li className="col-4 col-md-3 d-flex align-items-end">
            <Button
              type="submit"
              size="lg"
              className="fw-bold w-100 py0"
              color="primary"
              variant="filled"
              style={{
                height: "50px",
              }}
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
