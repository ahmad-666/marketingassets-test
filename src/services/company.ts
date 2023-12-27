import axios from "@/src/utils/axios";
import { type AxiosResponse } from "axios";
import type {
  GetCompaniesResponse,
  GetCompanyResponse,
  GetIndustriesResponse,
  CompanyFilters,
  CompaniesFilters,
  CommentReqBody,
  CommentResponse,
  CommentFilters,
  GetCommentsResponse,
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
export const addComment = async ({
  companyId,
  userName,
  userEmail,
  body,
  rate,
}: CommentReqBody) => {
  const { data } = await axios.post<
    CommentResponse,
    AxiosResponse<CommentResponse>,
    CommentReqBody
  >("/companies/comments", {
    companyId,
    userName,
    userEmail,
    body,
    rate,
  });
  return data;
};
export const getComments = async ({
  companyId,
  page = 1,
  pageSize,
}: CommentFilters) => {
  const { data } = await axios.get<GetCommentsResponse>(
    `/companies/${companyId}/comments`,
    {
      params: {
        companyId,
        page,
        pageSize,
      },
    }
  );
  return data;
};
