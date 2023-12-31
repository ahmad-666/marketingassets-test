import dayjs from "dayjs";
import type {
  CompanyTableAttribute,
  CompanyResponse,
  Company,
  CommentTableAttribute,
  CommentResponse,
  Comment,
  IndustryResponse,
  Industry,
} from "@/src/types/Company";

export const companyDbToResponse = (
  company: CompanyTableAttribute
): CompanyResponse => {
  return {
    ...company,
  };
};
export const commentDbToResponse = (
  comment: CommentTableAttribute
): CommentResponse => {
  return {
    ...comment,
  };
};
export const industryDbToResponse = (industry: {
  DISTINCT: string;
}): IndustryResponse => {
  return {
    ...industry,
    industry: industry.DISTINCT,
    text: industry.DISTINCT,
  };
};
export const companyResponseToClient = (company: CompanyResponse): Company => {
  return {
    ...company,
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
  };
};
export const industryResponseToClient = (
  industry: IndustryResponse
): Industry => {
  return {
    ...industry,
    id: industry.industry,
    name: industry.text,
  };
};
export const commentResponseToClient = (comment: CommentResponse): Comment => {
  return {
    ...comment,
    id: comment.id,
    date: dayjs(comment.createdAt).format("YYYY/MM/DD"),
    userName: comment.userName,
    userEmail: comment.userEmail,
    comment: comment.body,
    rate: comment.rate,
  };
};
