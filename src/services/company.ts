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
  pageSize = null,
}: CompaniesFilters) => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      industry,
      page,
      pageSize,
    },
  });
  return data;
};
export const getCompany = async ({ companyId }: CompanyFilters) => {
  const { data } = await axios.get<GetCompanyResponse>(
    `/companies/${companyId}`
  );
  return data;
};
export const getIndustries = async () => {
  const { data } = await axios.get<GetIndustriesResponse>(
    "/companies/industries"
  );
  return data;
};
