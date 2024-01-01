import axios from "@/src/utils/axios";
import {
  universityResponseToClient,
  commentResponseToClient,
} from "@/src/utils/transforms/university";
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
  Comment,
} from "@/src/types/University";

export const getUniversities = async ({
  page = 1,
  pageSize,
  search,
}: UniversitiesFilters): Promise<GetUniversities> => {
  const { data } = await axios.get<GetUniversitiesResponse>("/universities", {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return {
    items: data.items.map((university) => ({
      ...universityResponseToClient(university),
    })),
    totalCount: data.meta.totalCount,
  };
};
export const getUniversity = async ({
  name,
}: UniversityFilter): Promise<University> => {
  const { data } = await axios.get<GetUniversityResponse>(
    `/universities/${name}`
  );
  return {
    ...universityResponseToClient(data),
  };
};
export const addComment = async ({
  universityId,
  userName,
  userEmail,
  body,
  rate,
}: CommentReqBody): Promise<Comment> => {
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
  return {
    ...commentResponseToClient(data),
  };
};
export const getComments = async ({
  universityId,
  page = 1,
  pageSize,
}: CommentFilters): Promise<GetComments> => {
  const { data } = await axios.get<GetCommentsResponse>(
    `/universities/${universityId}/comments`,
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
