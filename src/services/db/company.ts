import { Op, type WhereOptions } from "sequelize";
import { Company } from "@/src/db/models";
import type {
  CompaniesFilters,
  CompanyFilters,
  CompanyResponse,
} from "@/src/types/Company";

export async function getCompany({ companyId }: CompanyFilters) {
  const where: WhereOptions<CompanyResponse> = {
    domain: companyId,
  };
  const company = await Company.findOne({
    where,
  });
  return company;
}
export async function getCompanies({
  page = 1,
  pageSize = null,
  industry,
  search,
}: CompaniesFilters) {
  let where: WhereOptions<CompanyResponse> = {};
  if (industry) where.industry = industry;
  if (search)
    where.name = {
      [Op.substring]: search,
    };
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
