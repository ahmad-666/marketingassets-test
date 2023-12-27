//client-side types
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
export type Industry = {
  id: string;
  name: string;
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
export type Comment = {
  id: number;
  userName: string;
  userEmail: string;
  comment: string;
  rate: number;
};
//server-side types
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
  meta: {
    totalCount: number;
  };
};
export type IndustryResponse = {
  industry: string;
  text: string;
};
export type GetIndustriesResponse = {
  items: IndustryResponse[];
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
  companyId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
