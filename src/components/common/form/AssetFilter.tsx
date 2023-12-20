import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import TextField from "@/src/components/common/form/TextField";
import AutoComplete from "@/src/components/common/form/AutoComplete";
import Icon from "@/src/components/common/Icon";
import type { Option } from "@/src/types/Common";

type Type = "emoji" | "logo";
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
  const [type, setType] = useState<null | Type>(null);
  const [search, setSearch] = useState("");
  const readUrlQueries = useCallback(() => {
    const { type, search } = router.query;
    const typeQuery = type as Type;
    const searchQuery = search as string;
    setType(typeQuery || null);
    setSearch(searchQuery || "");
  }, [router.query]);
  const setUrlQueries = useCallback(() => {
    let url: null | string = null;
    if (type === "emoji") url = "/emojis";
    else if (type === "logo") url = "logos";
    else throw new Error("Invalid type!!!");
    router.replace({
      pathname: url,
      query: {
        type,
        search,
      },
    });
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
        className="bg-white rounded-3 position-relative w-100 shadow p-3 p-md-5"
      >
        <ul className="row">
          <li className="col">
            <AutoComplete
              value={type}
              onChange={(newType) => setType(newType)}
              options={typeOptions}
              label="Asset"
              placeholder="Select Asset..."
              hideDetails
            />
          </li>
          <li className="col">
            <TextField
              value={search}
              onChange={(newSearch) => setSearch(newSearch)}
              label="Term"
              placeholder="Enter Search Term..."
              hideDetails
            />
          </li>
          <li className="col">
            <button
              type="submit"
              className="w-100 btn btn-thm advnc_search_form_btn"
            >
              <Icon icon="mdi:search" size="md" className="text-dark-color" />
              Search
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
