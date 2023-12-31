import { useMemo } from "react";
import { useRouter } from "next/router";
import MetaData from "@/src/components/common/MetaData";
import Container from "@/src/components/common/Container";
import CompaniesList from "@/src/components/company/CompaniesList";
import IndustriesList from "@/src/components/industry/IndustriesList";
import { getCompanies, getIndustries } from "@/src/services/company";
import type { Company, Industry } from "@/src/types/Company";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

const pageSize = 8;
type PageProps = {
  companies: Company[];
  totalCompanies: number;
  industries: Industry[];
};
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page, search } = context.query;
    const finalPage = +page || 1;
    const { items: companies, totalCount: totalCompanies } = await getCompanies(
      {
        page: finalPage,
        pageSize,
        search: search as string,
      }
    );
    const { items: industries } = await getIndustries();
    return {
      props: {
        companies,
        totalCompanies,
        industries,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({
  companies = [],
  totalCompanies = 0,
  industries = [],
}: PageProps) {
  const router = useRouter();
  const title = "Company Logo Repository: Download Logos or Integrate via API";
  const queries = useMemo(() => {
    const { page, search } = router.query;
    return {
      page: +page || 1,
      search: search as string,
    };
  }, [router.query]);
  return (
    <div>
      <MetaData
        title={title}
        description="Discover & download high-quality company logos or integrate seamlessly via API. Elevate your projects with our diverse logo collection."
      />
      <Container>
        <section className="pt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <h1 className="fs-2">{title}</h1>
              </div>
            </div>
          </div>
          <div className="row mt40">
            <div className="col-lg-12">
              <CompaniesList
                title="Browse Companies"
                items={companies}
                totalItems={totalCompanies}
                pageSize={pageSize}
                page={queries.page}
                search={queries.search}
                showPagination
              />
            </div>
          </div>
          <div className="row mt40">
            <div className="col-lg-12">
              <IndustriesList
                title="Browse Companies By Industries"
                items={industries}
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
