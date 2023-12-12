//client-side types
export type Company = {
  id: string;
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
export type GetCompanyArgs = {
  companyId: string;
};
export type GetCompaniesArgs = {
  industry?: string;
  page?: number;
  pageSize?: number;
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
export type GetCompaniesFilters = {
  industry?: string;
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
