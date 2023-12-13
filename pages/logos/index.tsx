import CompaniesList from "@/src/components/company/CompaniesList";
import IndustriesList from "@/src/components/industry/IndustriesList";
import { getCompanies, getIndustries } from "@/src/services/company";
import type { Company, Industry } from "@/src/types/Company";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

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
    const { items: companies, meta: companiesMeta } = await getCompanies({
      page: 1,
      pageSize,
    });
    const { items: industries } = await getIndustries();
    return {
      props: {
        companies: companies.map((company) => ({
          id: company.domain,
          category: company.industry,
          name: company.name,
          imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
        })),
        totalCompanies: companiesMeta.totalCount,
        industries: industries.map((industry) => ({
          id: industry.industry,
          name: industry.text,
        })),
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
  return (
    <div>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center">
              <h2>
                Company Logo Repository: Download Logos or Integrate via API
              </h2>
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
    </div>
  );
}