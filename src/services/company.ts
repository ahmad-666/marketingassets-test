import axios from "@/src/utils/axios";
import {
  companyResponseToClient,
  industryResponseToClient,
  commentResponseToClient,
} from "@/src/utils/transforms/company";
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
  GetComments,
  GetCompanies,
  Company,
  GetIndustries,
} from "@/src/types/Company";

export const getCompanies = async ({
  industry,
  page = 1,
  pageSize,
  search,
}: CompaniesFilters): Promise<GetCompanies> => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      industry,
      page,
      pageSize,
      search,
    },
  });
  return {
    items: data.items.map((company) => ({
      ...companyResponseToClient(company),
    })),
    totalCount: data.meta.totalCount,
  };
};
export const getCompany = async ({
  domain,
}: CompanyFilters): Promise<Company> => {
  const { data } = await axios.get<GetCompanyResponse>(`/companies/${domain}`);
  return {
    ...companyResponseToClient(data),
  };
};
export const getIndustries = async (): Promise<GetIndustries> => {
  const { data } = await axios.get<GetIndustriesResponse>(
    "/companies/industries"
  );
  return {
    items: data.items.map((industry) => ({
      ...industryResponseToClient(industry),
    })),
  };
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
  return commentResponseToClient(data);
};
export const getComments = async ({
  companyId,
  page = 1,
  pageSize,
}: CommentFilters): Promise<GetComments> => {
  const { data } = await axios.get<GetCommentsResponse>(
    `/companies/${companyId}/comments`,
    {
      params: {
        page,
        pageSize,
      },
    }
  );
  return {
    items: data.items.map((comment) => ({
      ...commentResponseToClient(comment),
    })),
    totalCount: data.meta.totalCount,
  };
};
