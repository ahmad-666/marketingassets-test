import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import type {
  CommentTableAttribute,
  CommentTableCreationAttribute,
} from "@/src/types/University";

const createUniversityCommentModel = () => {
  class UniversityComment extends Model<
    CommentTableAttribute,
    CommentTableCreationAttribute
  > {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userName: string;
    declare userEmail: string;
    declare body: string;
    declare rate: number;
    declare universityId: number;
  }
  UniversityComment.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userName: { type: DataTypes.STRING, allowNull: false },
      userEmail: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      rate: { type: DataTypes.INTEGER, allowNull: true },
      universityId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "universities",
          key: "id",
        },
      },
    },
    {
      sequelize: connection,
      modelName: "university_comments",
      timestamps: true,
    }
  );
  return UniversityComment;
};

export default createUniversityCommentModel();
