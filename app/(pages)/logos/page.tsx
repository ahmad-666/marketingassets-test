import CompaniesList from "@/app/components/listing/CompaniesList";
import type { Company } from "@/app/types/Company";
import { getCompanies } from "@/app/services/company";

type PageProps = {};
const pageSize = 8;
export default async function Page({}: PageProps) {
  const companies: Company[] = [];
  const { items, meta } = await getCompanies({
    page: 1,
    pageSize,
  });
  const totalCompanies = meta.totalCount;
  items.forEach((company) => {
    companies.push({
      id: company.id,
      category: company.industry,
      name: company.name,
      imgSrc:
        "https://companyurlfinder.com/marketing/assets/img/logos/amazon.com.png.pagespeed.ce.A3e8VyaHlv.png",
    });
  });
  return (
    <div>
      <CompaniesList
        title="Company Logo Repository: Download Logos or Integrate via API"
        items={companies}
        totalItems={totalCompanies}
        pageSize={pageSize}
      />
    </div>
  );
}
