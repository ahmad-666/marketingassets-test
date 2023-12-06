import axios from "@/app/utils/axios";
import type {
  GetCompaniesResponse,
  GetIndustriesResponse,
} from "@/app/types/Company";

type GetCompanies = {
  page?: number;
  pageSize?: number;
};
export const getCompanies = async ({
  page = 1,
  pageSize = 8,
}: GetCompanies) => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      page,
      pageSize,
    },
  });
  return data;
};
export const getIndustries = async () => {
  const { data } = await axios.get<GetIndustriesResponse>(
    "/companies/industries"
  );
  return data;
};
