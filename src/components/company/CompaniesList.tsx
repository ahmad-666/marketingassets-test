import { useMemo } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "@tanstack/react-query";
import CompanyCard from "./CompanyCard";
import SpinnerLoader from "@/src/components/loaders/SpinnerLoader";
import { getCompanies } from "@/src/services/company";
import type { Company } from "@/src/types/Company";

type CompanyListProps = {
  title: string;
  items: Company[];
  totalItems?: number;
  pageSize?: number;
  showMore?: boolean;
  targetIndustry?: string;
  className?: string;
};

export default function CompaniesList({
  title,
  items = [],
  totalItems = 0,
  pageSize = 8,
  showMore = true,
  targetIndustry,
  className = "",
}: CompanyListProps) {
  const router = useRouter();
  const { id } = router.query;
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [pageSize, totalItems]);
  const {
    isFetching,
    data: pages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    initialData: { pages: [[...items]], pageParams: [{ page: 1 }] },
    refetchOnMount: false,
    queryKey: ["get-companies", id, targetIndustry, pageSize],
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const currentPage = lastPageParam.page;
      if (currentPage === totalPages) return null; //no next-page
      return {
        page: currentPage + 1,
      };
    },
    initialPageParam: {
      page: 1,
    },
    queryFn: async ({ pageParam }) => {
      const { items } = await getCompanies({
        page: pageParam.page || 1,
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
      return newCompanies;
    },
  });

  return (
    <div className={`${className}`}>
      <h3>{title}</h3>
      <div className="mt30">
        <div
          className="row align-items-stretch"
          data-aos-delay="100"
          data-aos="fade-up"
        >
          {pages.pages.map((page) =>
            page.map((company) => (
              <CompanyCard
                className="col-sm-6 col-xl-3 p10"
                key={company.id}
                id={company.id}
                name={company.name}
                category={company.category}
                imgSrc={company.imgSrc}
              />
            ))
          )}
        </div>
        {isFetching && <SpinnerLoader className="mt10" />}
        {showMore && hasNextPage && (
          <div className="mt10 text-center">
            <button
              className="btn more_listing"
              onClick={() => {
                fetchNextPage();
              }}
            >
              Show More
              <span className="icon">
                <span className="fas fa-plus" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
