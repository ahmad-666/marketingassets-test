import axios from "@/src/utils/axios";
import dayjs from "dayjs";
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
}: CompaniesFilters) => {
  const { data } = await axios.get<GetCompaniesResponse>("/companies", {
    params: {
      industry,
      page,
      pageSize,
      search,
    },
  });
  const normalizeData: GetCompanies = {
    items: data.items.map((company) => ({
      id: company.id,
      domain: company.domain,
      category: company.industry,
      name: company.name,
      imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${company.domain}.png`,
      country: company.country,
      founded: company.founded,
      overview: company.overview,
      size: company.size,
      followers: company.followers_count,
      linkedin: company.linkedin,
      twitter: company.twitter,
      facebook: company.facebook,
    })),
    totalCount: data.meta.totalCount,
  };
  return normalizeData;
};
export const getCompany = async ({ domain }: CompanyFilters) => {
  const { data } = await axios.get<GetCompanyResponse>(`/companies/${domain}`);
  const normalizeData: Company = {
    id: data.id,
    domain: data.domain,
    category: data.industry,
    name: data.name,
    imgSrc: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/logos/${data.domain}.png`,
    country: data.country,
    founded: data.founded,
    overview: data.overview,
    size: data.size,
    followers: data.followers_count,
    linkedin: data.linkedin,
    twitter: data.twitter,
    facebook: data.facebook,
  };
  return normalizeData;
};
export const getIndustries = async () => {
  const { data } = await axios.get<GetIndustriesResponse>(
    "/companies/industries"
  );
  const normalizeData: GetIndustries = {
    items: data.items.map((industry) => ({
      id: industry.industry,
      name: industry.text,
    })),
  };
  return normalizeData;
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
        page,
        pageSize,
      },
    }
  );
  const normalizeData: GetComments = {
    items: data.items.map((comment) => ({
      id: comment.id,
      date: dayjs(comment.createdAt).format("YYYY/MM/DD"),
      userName: comment.userName,
      userEmail: comment.userEmail,
      comment: comment.body,
      rate: comment.rate,
    })),
    totalCount: data.meta.totalCount,
  };
  return normalizeData;
};
