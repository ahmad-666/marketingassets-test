import axios from "@/app/utils/axios";
import type { GetCompanyResponse } from "@/app/types/Company";

type GetCompanies = {
  page?: number;
  pageSize?: number;
};
export const getCompanies = async ({
  page = 1,
  pageSize = 8,
}: GetCompanies) => {
  const { data } = await axios.get<GetCompanyResponse>("/companies", {
    params: {
      page,
      pageSize,
    },
  });
  return data;
};
