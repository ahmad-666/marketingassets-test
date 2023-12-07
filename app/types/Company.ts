export type Company = {
  id: number;
  name: string;
  imgSrc: string;
  category: string;
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
export type GetCompaniesResponse = {
  items: CompanyResponse[];
  meta: {
    totalCount: number;
  };
};
export type GetCompanyResponse = CompanyResponse;
export type Industry = {
  id: string;
  name: string;
};
export type IndustryResponse = {
  industry: string;
  text: string;
};
export type GetIndustriesResponse = {
  items: IndustryResponse[];
};
