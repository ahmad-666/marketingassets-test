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
};

export default function CompaniesList({
  title,
  items = [],
  totalItems = 0,
  pageSize = 8,
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
          imgSrc:
            "https://companyurlfinder.com/marketing/assets/img/logos/amazon.com.png.pagespeed.ce.A3e8VyaHlv.png",
        });
      });
      return newCompanies;
    },
  });

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos-delay="100" data-aos="fade-up">
            <div className="row">
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
          </div>
        </div>
        {isFetching && <SpinnerLoader className="mt10" />}
        {hasNextPage && (
          <div className="row mt20">
            <div className="col-lg-12">
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
