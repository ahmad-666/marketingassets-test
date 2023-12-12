import { Company } from "@/src/db/models";
import { textNormalize } from "@/src/utils/textTransform";
import type {
  CompaniesFilters,
  CompanyFilters,
  CompanyDbFilters,
  CompaniesDbFilters,
} from "@/src/types/Company";

export async function getCompany({ companyId }: CompanyFilters) {
  const where: CompanyDbFilters = {
    domain: companyId,
  };
  const company = await Company.findOne({
    where,
  });
  return company;
}
export async function getCompanies({
  page,
  pageSize,
  industry,
}: CompaniesFilters) {
  let where: CompaniesDbFilters = {};
  if (industry) where.industry = industry;
  const { count, rows } = await Company.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
  });
  return { count, rows };
}
export async function getIndustries() {
  const industries = await Company.aggregate("industry", "DISTINCT", {
    plain: false,
  });
  return industries;
}
