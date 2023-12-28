import { Op, type WhereOptions } from "sequelize";
import { Company, CompanyComment } from "@/src/db/models";
import type {
  CommentReqBody,
  CompaniesFilters,
  CompanyFilters,
  CompanyResponse,
  CommentFilters,
  CommentResponse,
} from "@/src/types/Company";

export async function getCompany({ domain }: CompanyFilters) {
  const where: WhereOptions<CompanyResponse> = {
    domain,
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
export async function addComment({
  companyId,
  userName,
  userEmail,
  body,
  rate,
}: CommentReqBody) {
  const newComment = await CompanyComment.create({
    companyId,
    userName,
    userEmail,
    body,
    rate,
  });
  return newComment;
}
export async function getComments({
  companyId,
  page = 1,
  pageSize = null,
}: CommentFilters) {
  let where: WhereOptions<CommentResponse> = {};
  if (companyId) where.companyId = companyId;
  const { count, rows } = await CompanyComment.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
    order: [["createdAt", "DESC"]],
  });
  return { count, rows };
}
