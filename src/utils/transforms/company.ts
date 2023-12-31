import type {
  CompanyTableAttribute,
  CompanyResponse,
  CommentTableAttribute,
  CommentResponse,
  IndustryResponse,
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
