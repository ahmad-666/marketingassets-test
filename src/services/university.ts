import axios from "@/src/utils/axios";
import dayjs from "dayjs";
import { type AxiosResponse } from "axios";
import type {
  UniversitiesFilters,
  GetUniversitiesResponse,
  GetUniversities,
  UniversityFilter,
  GetUniversityResponse,
  University,
  CommentReqBody,
  CommentResponse,
  CommentFilters,
  GetCommentsResponse,
  GetComments,
} from "@/src/types/University";

export const getUniversities = async ({
  page = 1,
  pageSize,
  search,
}: UniversitiesFilters) => {
  const { data } = await axios.get<GetUniversitiesResponse>("/universities", {
    params: {
      page,
      pageSize,
      search,
    },
  });
  const normalizeData: GetUniversities = {
    items: [],
    totalCount: data.meta.totalCount,
  };
  return normalizeData;
};
export const getUniversity = async ({ name }: UniversityFilter) => {
  const { data } = await axios.get<GetUniversityResponse>(
    `/universities/${name}`
  );
  const normalizeData: University = {
    id: 1,
    imgSrc: "",
    name: "",
  };
  return normalizeData;
};
export const addComment = async ({
  universityId,
  userName,
  userEmail,
  body,
  rate,
}: CommentReqBody) => {
  const { data } = await axios.post<
    CommentResponse,
    AxiosResponse<CommentResponse>,
    CommentReqBody
  >("/universities/comments", {
    universityId,
    userName,
    userEmail,
    body,
    rate,
  });
  return data;
};
export const getComments = async ({
  universityId,
  page = 1,
  pageSize,
}: CommentFilters) => {
  const { data } = await axios.get<GetCommentsResponse>(
    `/universities/${universityId}/comments`,
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
