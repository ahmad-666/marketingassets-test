import { useCallback } from "react";
import { useRouter } from "next/router";

type Mode = "push" | "replace";
type StringQuery = {
  type: "string";
  value: string;
  defaultValue: string;
};
type NumberQuery = {
  type: "number";
  value: number;
  defaultValue: number;
};
type BoolQuery = {
  type: "boolean";
  value: boolean;
  defaultValue: boolean;
};
type RangeQuery = {
  type: "range";
  value: number[];
  defaultValue: number[];
};
type StringArrayQuery = {
  type: "string-array";
  value: string[];
  defaultValue: string[];
};
type NumberArrayQuery = {
  type: "number-array";
  value: number[];
  defaultValue: number[];
};
type Query =
  | StringQuery
  | NumberQuery
  | BoolQuery
  | RangeQuery
  | StringArrayQuery
  | NumberArrayQuery;
type BasicQuery = {
  name: string;
};
type UrlQuery = BasicQuery & Query;
type SetQuery = {
  name: string;
  value: any; //normal value
  queryValue: string; //value that we give it to url query
};
type UseUrlQueryArgs = {
  queries: UrlQuery[];
  generateDefaultQueries?: boolean;
  mode?: Mode;
  scroll?: boolean;
};
const useUrlQuery = ({
  queries = [], //no need for this array to be state and can be any normal array
  generateDefaultQueries = false,
  mode = "replace",
  scroll = false,
}: UseUrlQueryArgs) => {
  const router = useRouter();
  const getUrlQuery = useCallback(() => {
    //get url query from url and return their parsed values
    const { query } = router;
    const parsedQueries: UrlQuery[] = [];
    Object.entries(query).forEach(([queryKey, queryValue]) => {
      const queryValueStr = queryValue as string;
      const targetQuery = queries.find((query) => query.name === queryKey);
      if (targetQuery) {
        const { type, name, defaultValue } = targetQuery;
        let value: any;
        if (type === "string") {
          value = queryValueStr || defaultValue;
        } else if (type === "number") {
          value = !isNaN(+queryValueStr) ? +queryValueStr : defaultValue;
        } else if (type === "boolean") {
          value = queryValueStr === "true";
        } else if (type === "range") {
          const splitQuery = queryValueStr.split(",").map((elm) => +elm);
          value = splitQuery.length ? splitQuery : defaultValue;
        } else if (type === "string-array") {
          const splitQuery = queryValueStr.split(",");
          value = splitQuery.length ? splitQuery : defaultValue;
        } else if (type === "number-array") {
          const splitQuery = queryValueStr.split(",").map((elm) => +elm);
          value = splitQuery.length ? splitQuery : defaultValue;
        } else throw new Error("Invalid url query type!!!");
        parsedQueries.push({
          type: type as any,
          name,
          value,
          defaultValue,
        });
      }
    });
    return parsedQueries;
  }, [router, queries]);
  const setUrlQuery = useCallback(() => {
    //set value of states to url query
    const parsedQueries: SetQuery[] = [];
    queries.forEach((query) => {
      const { type, name, value, defaultValue } = query;
      let finalValue: any;
      let queryValue: string;
      if (type === "string" || type === "number" || type === "boolean") {
        finalValue = value || defaultValue;
        queryValue = `${finalValue}`;
      } else if (
        type === "range" ||
        type === "string-array" ||
        type === "number-array"
      ) {
        finalValue = value.length ? value : defaultValue;
        queryValue = finalValue.join(",");
      } else throw new Error("Invalid query type passed to useUrlQuery!!!");
      if (
        generateDefaultQueries ||
        (!generateDefaultQueries &&
          JSON.stringify(finalValue) !== JSON.stringify(defaultValue))
      ) {
        //use JSON.stringify because defaultValue can be array,... too so we convert to convert for comparing
        parsedQueries.push({
          name,
          value: finalValue,
          queryValue,
        });
      }
    });
    const finalQueryQueries = Object.fromEntries(
      parsedQueries.map((parsedQuery) => [
        parsedQuery.name,
        parsedQuery.queryValue,
      ])
    );
    router[mode](
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...finalQueryQueries,
        },
      },
      undefined,
      { scroll }
    );
  }, [router, queries, mode, scroll, generateDefaultQueries]);
  return { getUrlQuery, setUrlQuery };
};
export default useUrlQuery;
