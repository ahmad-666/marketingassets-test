import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import CompanyCard from "@/src/components/company/CompanyCard";
import SpinnerLoader from "@/src/components/common/SpinnerLoader";
import Pagination from "@/src/components/common/Pagination";
import useMountedEffect from "@/src/hooks/useMountedEffect";
import { getCompanies } from "@/src/services/company";
import type { Company } from "@/src/types/Company";

type CompanyListProps = {
  title: string;
  items: Company[];
  totalItems?: number;
  page?: number;
  pageSize?: number;
  search?: string;
  targetCompany?: string;
  targetIndustry?: string;
  showPagination?: boolean;
  className?: string;
};
type Query = {
  newPage: number;
};

export default function CompaniesList({
  title,
  items = [],
  totalItems = 0,
  page = 1,
  pageSize = 8,
  search, //for search on name of companies
  targetCompany, //id of current company for use as dependency of useQuery to trigger re-fetch
  targetIndustry, //for list of companies of certain industry
  showPagination = true,
  className = "",
}: CompanyListProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const filterUpdated = useRef(false); //init value is false because for first render data will come from server
  const [pageVal, setPageVal] = useState(page);
  const router = useRouter();
  const setUrlQuery = useCallback(
    ({ newPage }: Query) => {
      if (showPagination) {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              page: newPage,
            },
          },
          undefined,
          { scroll: false }
        );
      }
    },
    [showPagination, router]
  );
  const scrollToContainer = useCallback(() => {
    if (showPagination) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPagination]);
  const changePage = useCallback((newVal: number) => {
    setPageVal(newVal);
    filterUpdated.current = true;
  }, []);
  const { isFetching, data: companies } = useQuery<Company[]>({
    refetchOnMount: false, //first render data will come from server so for first render we set initialData
    enabled: filterUpdated.current,
    initialData: [...items],
    queryKey: [
      "get-companies",
      targetCompany,
      targetIndustry,
      search,
      pageVal,
      pageSize,
    ],
    queryFn: async () => {
      const { items } = await getCompanies({
        page: pageVal || 1,
        pageSize,
        industry: targetIndustry
          ? decodeURIComponent(targetIndustry as string)
          : undefined,
        search,
      });
      setUrlQuery({ newPage: pageVal });
      scrollToContainer();
      filterUpdated.current = false;
      return items;
    },
  });
  useMountedEffect(() => {
    //reset page to 1 if filters change
    setPageVal(1);
    filterUpdated.current = true;
  }, [search]);

  return (
    <div className={`${className}`}>
      <div ref={containerRef}>
        <h2 className="fs-4">{title}</h2>
        <div className="mt30">
          <div
            className="row align-items-stretch"
            data-aos-delay="100"
            data-aos="fade-up"
          >
            {companies.map((company) => (
              <CompanyCard
                className="col-sm-6 col-xl-3 p10"
                key={`${company.id}-${company.name}`}
                id={company.id}
                domain={company.domain}
                name={company.name}
                category={company.category}
                imgSrc={company.imgSrc}
              />
            ))}
          </div>
          {isFetching && <SpinnerLoader className="mt10" />}
          {!!(totalItems && showPagination) && (
            <div className="row mt20">
              <div className="col-lg-12">
                <Pagination
                  className="d-flex justify-content-center"
                  page={pageVal}
                  setPage={changePage}
                  totalItems={totalItems}
                  pageSize={pageSize}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
