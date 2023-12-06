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
export type GetCompanyResponse = {
  items: CompanyResponse[];
  meta: {
    totalCount: number;
  };
};
export type CompanyCategory = {
  category: string;
  text: string;
};
export type GetCompanyCategoryResponse = {
  items: CompanyCategory[];
};
