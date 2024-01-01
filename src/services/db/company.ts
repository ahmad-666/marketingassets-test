import { Op, type WhereOptions } from "sequelize";
import { Companies, CompanyComments } from "@/src/db/models";
import type {
  CommentReqBody,
  CompaniesFilters,
  CompanyFilters,
  CompanyTableAttribute,
  CommentFilters,
  CommentTableAttribute,
} from "@/src/types/Company";

export async function getCompany({ domain }: CompanyFilters) {
  const where: WhereOptions<CompanyTableAttribute> = {
    domain,
  };
  const company = await Companies.findOne({
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
  let where: WhereOptions<CompanyTableAttribute> = {};
  if (industry) where.industry = industry;
  if (search)
    where.name = {
      [Op.substring]: search,
    };
  const { count, rows } = await Companies.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
  });
  return { count, rows };
}
export async function getIndustries() {
  const industries = await Companies.aggregate("industry", "DISTINCT", {
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
  const newComment = await CompanyComments.create({
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
  let where: WhereOptions<CommentTableAttribute> = {};
  if (companyId) where.companyId = companyId;
  const { count, rows } = await CompanyComments.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
    order: [["createdAt", "DESC"]],
  });
  return { count, rows };
}
