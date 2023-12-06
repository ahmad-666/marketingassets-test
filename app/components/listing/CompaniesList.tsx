"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CompanyCard from "@/app/components/cards/CompanyCard";
import SpinnerLoader from "@/app/components/Loaders/SpinnerLoader";
import { getCompanies } from "@/app/services/company";
import type { Company } from "@/app/types/Company";

type CompanyListProps = {
  title: string;
  items: Company[];
  totalItems?: number;
  pageSize?: number;
  className?: string;
};

export default function CompaniesList({
  title,
  items = [],
  totalItems = 0,
  pageSize = 8,
  className = "",
}: CompanyListProps) {
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
    queryKey: ["get-companies"],
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
      });
      const newCompanies: Company[] = [];
      items.forEach((company) => {
        newCompanies.push({
          id: company.id,
          category: company.industry,
          name: company.name,
          imgSrc: `https://api.companyurlfinder.com/logo/${company.domain}`,
        });
      });
      return newCompanies;
    },
  });

  return (
    <div className={`${className}`}>
      <div className="main-title">
        <h3>{title}</h3>
      </div>
      <div className="row" data-aos-delay="100" data-aos="fade-up">
        {pages.pages.map((page) =>
          page.map((company) => (
            <CompanyCard
              className="col-sm-6 col-xl-3"
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
      {hasNextPage && (
        <div className="text-center">
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
  );
}