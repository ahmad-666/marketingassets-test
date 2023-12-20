import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import CompanyCard from "@/src/components/company/CompanyCard";
import SpinnerLoader from "@/src/components/loaders/SpinnerLoader";
import Pagination from "@/src/components/common/Pagination";
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
  }, []);
  const { isFetching, data: companies } = useQuery<Company[]>({
    initialData: [...items],
    refetchOnMount: false,
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
      const newCompanies: Company[] = [];
      items.forEach((company) => {
        newCompanies.push({
          id: company.domain,
          category: company.industry,
          name: company.name,
          imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
        });
      });
      setUrlQuery({ newPage: pageVal });
      scrollToContainer();
      return newCompanies;
    },
  });

  return (
    <div className={`${className}`}>
      <div ref={containerRef}>
        <h3>{title}</h3>
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
