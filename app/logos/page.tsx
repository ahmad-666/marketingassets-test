import CompaniesList from "@/app/components/listing/CompaniesList";
import IndustriesList from "@/app/components/listing/IndustryList";
import type { Company, Industry } from "@/app/types/Company";
import { getCompanies, getIndustries } from "@/app/services/company";

type PageProps = {};
const pageSize = 8;
export const dynamic = "force-dynamic"; //ssr
export default async function Page({}: PageProps) {
  const companies: Company[] = [];
  const industries: Industry[] = [];
  const { items: companiesResponse, meta: companiesMeta } = await getCompanies({
    page: 1,
    pageSize,
  });
  const { items: industriesResponse } = await getIndustries();
  const totalCompanies = companiesMeta.totalCount;
  companiesResponse.forEach((company) => {
    companies.push({
      id: company.id,
      category: company.industry,
      name: company.name,
      imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
    });
  });
  industriesResponse.forEach((industry) => {
    industries.push({
      id: industry.industry,
      name: industry.text,
    });
  });
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
