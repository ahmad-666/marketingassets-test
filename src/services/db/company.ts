import { Company } from "@/src/db/models";
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
  page = 1,
  pageSize = 8,
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
  type Industry = {
    DISTINCT: string;
  };
  return industries as Industry[];
}
