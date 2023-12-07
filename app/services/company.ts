import axios from "@/app/utils/axios";
import type {
  GetCompaniesResponse,
  GetCompanyResponse,
  GetIndustriesResponse,
} from "@/app/types/Company";

type GetCompanies = {
  industry?: string;
  page?: number;
  pageSize?: number;
};
type GetCompany = {
  companyId: string;
};
export const getCompanies = async ({
  industry,
  page = 1,
  pageSize = 8,
}: GetCompanies) => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      industry,
      page,
      pageSize,
    },
  });
  return data;
};
export const getCompany = async ({ companyId }: GetCompany) => {
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
