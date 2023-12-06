import CompaniesList from "@/app/components/listing/CompaniesList";
import type { Company } from "@/app/types/Company";
import { getCompanies } from "@/app/services/company";

type PageProps = {};
const pageSize = 8;
export default async function Page({}: PageProps) {
  // const companies: Company[] = [];
  // const { items, meta } = await getCompanies({
  //   page: 1,
  //   pageSize,
  // });
  // const totalCompanies = meta.totalCount;
  // items.forEach((company) => {
  //   companies.push({
  //     id: company.id,
  //     category: company.industry,
  //     name: company.name,
  //     imgSrc: `https://api.companyurlfinder.com/logo/${company.domain}`,
  //   });
  // });
  return (
    <div>
      <section className="container">
        {/* <div className="row justify-content-center">
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
              items={[]}
              totalItems={0}
              pageSize={pageSize}
            />
          </div>
        </div> */}
      </section>
    </div>
  );
}
