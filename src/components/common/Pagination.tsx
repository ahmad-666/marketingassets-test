import { useCallback, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Icon from "./Icon";
import ClientOnly from "./ClientOnly";

type PaginationProps = {
  page: number;
  setPage: (newPage: number) => void;
  totalItems: number;
  pageSize?: number;
  pageRange?: number;
  containerClassName?: string;
  className?: string;
};

export default function Pagination({
  page = 1,
  setPage,
  totalItems = 0,
  pageSize = 10,
  pageRange = 1,
  containerClassName = "",
  className = "",
}: PaginationProps) {
  const pageCount = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);
  const containerCssClass = useMemo(() => {
    return "d-flex fs-6";
  }, []);
  const pageCssClass = useMemo(() => {
    return "d-flex justify-content-center align-items-center";
  }, []);
  const pageLinkCssClass = useMemo(() => {
    return "py10 px15";
  }, []);
  const pageActiveCssClass = useMemo(() => {
    return "rounded-2 bg-primary-color";
  }, []);
  const pageActiveLinkCssClass = useMemo(() => {
    return "text-white";
  }, []);
  const pageChangeHandler = useCallback(
    ({ selected }) => {
      setPage(selected + 1);
    },
    [setPage]
  );
  return (
    <ClientOnly>
      <div className={`${className}`}>
        <ReactPaginate
          forcePage={page - 1}
          onPageChange={pageChangeHandler}
          pageCount={pageCount}
          pageRangeDisplayed={pageRange}
          breakLabel="..."
          previousLabel={<Icon icon="mdi:arrow-left-thin" size="md" />}
          nextLabel={<Icon icon="mdi:arrow-right-thin" size="md" />}
          containerClassName={`${containerCssClass} ${containerClassName}`}
          pageClassName={pageCssClass}
          pageLinkClassName={pageLinkCssClass}
          previousClassName={pageCssClass}
          previousLinkClassName={pageLinkCssClass}
          nextClassName={pageCssClass}
          nextLinkClassName={pageLinkCssClass}
          breakClassName={`pointer-events-none ${pageCssClass}`}
          breakLinkClassName={pageLinkCssClass}
          activeClassName={pageActiveCssClass}
          activeLinkClassName={pageActiveLinkCssClass}
        />
      </div>
    </ClientOnly>
  );
}
