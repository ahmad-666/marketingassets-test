import CompaniesList from "@/app/components/listing/CompaniesList";
import type { Company } from "@/app/types/Company";
import { getCompanies } from "@/app/services/company";
import { textTransform } from "@/app/utils/textTransform";

type PageProps = {
  params: {
    industryId: string;
  };
};
const pageSize = 8;
export const dynamic = "force-dynamic"; //ssr
export default async function Page({ params: { industryId } }: PageProps) {
  const decodedIndustry = decodeURIComponent(industryId);
  const companies: Company[] = [];
  const industryText = textTransform(decodedIndustry);
  const { items: companiesResponse, meta: companiesMeta } = await getCompanies({
    industry: decodedIndustry,
    page: 1,
    pageSize,
  });
  const totalCompanies = companiesMeta.totalCount;
  companiesResponse.forEach((company) => {
    companies.push({
      id: company.id,
      category: company.industry,
      name: company.name,
      imgSrc: `https://api.companyurlfinder.com/logo/${company.domain}`,
    });
  });
  return (
    <div>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center">
              <h2>
                {`${industryText} Company Logos Repository: Download Logos in industry ${industryText}`}
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
              industry={decodedIndustry}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
