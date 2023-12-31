import { Op, type WhereOptions } from "sequelize";
import { University, UniversityComment } from "@/src/db/models";
import type {
  UniversityFilter,
  UniversitiesFilters,
  UniversityTableAttribute,
  CommentReqBody,
  CommentFilters,
  CommentResponse,
} from "@/src/types/University";

export async function getUniversity({ name }: UniversityFilter) {
  const where: WhereOptions<UniversityTableAttribute> = {
    name,
  };
  const university = await University.findOne({
    where,
  });
  return university;
}
export async function getUniversities({
  page = 1,
  pageSize = null,
  search,
}: UniversitiesFilters) {
  let where: WhereOptions<UniversityTableAttribute> = {};
  if (search)
    where.name = {
      [Op.substring]: search,
    };
  const { count, rows } = await University.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
  });
  return { count, rows };
}
export async function addComment({
  universityId,
  userName,
  userEmail,
  body,
  rate,
}: CommentReqBody) {
  const newComment = await UniversityComment.create({
    universityId,
    userName,
    userEmail,
    body,
    rate,
  });
  return newComment;
}
export async function getComments({
  universityId,
  page = 1,
  pageSize = null,
}: CommentFilters) {
  let where: WhereOptions<CommentResponse> = {};
  if (universityId) where.universityId = universityId;
  const { count, rows } = await UniversityComment.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
    order: [["createdAt", "DESC"]],
  });
  return { count, rows };
}
