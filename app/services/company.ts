import axios from "@/app/utils/axios";
import type {
  GetCompaniesResponse,
  GetCompanyResponse,
  GetIndustriesResponse,
  GetCompaniesArgs,
  GetCompanyArgs,
} from "@/app/types/Company";

export const getCompanies = async ({
  industry,
  page = 1,
  pageSize,
}: GetCompaniesArgs) => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      industry,
      page,
      pageSize,
    },
  });
  return data;
};
export const getCompany = async ({ companyId }: GetCompanyArgs) => {
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
