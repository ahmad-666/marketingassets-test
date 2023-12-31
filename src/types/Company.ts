import { type Optional } from "sequelize";
import type { ServerMeta } from "./Common";

//Company
export type Company = {
  id: number;
  domain: string;
  name: string;
  imgSrc: string;
  category: string;
  overview?: string;
  country?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  size?: string;
  founded?: number;
  followers?: number;
};
export type GetCompanies = {
  items: Company[];
  totalCount: number;
};
export type Industry = {
  id: string;
  name: string;
};
export type GetIndustries = {
  items: Industry[];
};
export type CompanyFilters = {
  domain: string;
};
export type CompaniesFilters = {
  industry?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};
export type CompanyResponse = {
  id: number;
  name: string;
  overview: string;
  country: string;
  domain: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  size: string;
  founded: number;
  industry: string;
  followers_count: number;
};
export type GetCompanyResponse = CompanyResponse;
export type GetCompaniesResponse = {
  items: CompanyResponse[];
} & ServerMeta;
export type IndustryResponse = {
  industry: string;
  text: string;
};
export type GetIndustriesResponse = {
  items: IndustryResponse[];
};
export type CompanyTableAttribute = {
  id: number;
  name: string;
  overview: string;
  country: string;
  domain: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  size: string;
  founded: number;
  industry: string;
  followers_count: number;
};
export type CompanyTableCreationAttribute = Optional<
  CompanyTableAttribute,
  "id"
>;
//Company Comment
export type Comment = {
  id: number;
  date: string;
  userName: string;
  userEmail?: string;
  comment: string;
  rate: number;
};
export type GetComments = {
  items: Comment[];
  totalCount: number;
};
export type CommentFilters = {
  companyId: number;
  page?: number;
  pageSize?: number;
};
export type CommentReqBody = {
  companyId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type CommentResponse = {
  id: number; //commentId
  createdAt: Date;
  updatedAt: Date;
  companyId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type GetCommentsResponse = {
  items: CommentResponse[];
} & ServerMeta;
