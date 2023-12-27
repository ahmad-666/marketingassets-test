import axios from "@/src/utils/axios";
import type {
  GetCompaniesResponse,
  GetCompanyResponse,
  GetIndustriesResponse,
  CompanyFilters,
  CompaniesFilters,
} from "@/src/types/Company";

export const getCompanies = async ({
  industry,
  page = 1,
  pageSize,
  search,
}: CompaniesFilters) => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      industry,
      page,
      pageSize,
      search,
    },
  });
  return data;
};
export const getCompany = async ({ domain }: CompanyFilters) => {
  const { data } = await axios.get<GetCompanyResponse>(`/companies/${domain}`);
  return data;
};
export const getIndustries = async () => {
  const { data } = await axios.get<GetIndustriesResponse>(
    "/companies/industries"
  );
  return data;
};
