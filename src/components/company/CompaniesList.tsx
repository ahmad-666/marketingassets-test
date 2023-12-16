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
  pageSize?: number;
  showPagination?: boolean;
  targetIndustry?: string;
  className?: string;
};
type Query = {
  newPage: number;
};

export default function CompaniesList({
  title,
  items = [],
  totalItems = 0,
  pageSize = 8,
  showPagination = true,
  targetIndustry,
  className = "",
}: CompanyListProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  const setUrlQuery = useCallback(
    ({ newPage }: Query) => {
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
    },
    [router]
  );
  const scrollToContainer = useCallback(() => {
    if (showPagination) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPagination]);
  const changePage = useCallback((newVal: number) => {
    setPage(newVal);
  }, []);
  const { isFetching, data: companies } = useQuery<Company[]>({
    initialData: [...items],
    refetchOnMount: false,
    queryKey: ["get-companies", id, targetIndustry, page, pageSize],
    queryFn: async () => {
      const { items } = await getCompanies({
        page: page || 1,
        pageSize,
        industry: targetIndustry
          ? decodeURIComponent(targetIndustry as string)
          : undefined,
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
      setUrlQuery({ newPage: page });
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
                key={company.id}
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
                  page={page}
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
