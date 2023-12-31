import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const createUniversityCommentsModel = () => {
  class UniversityComments extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userName: string;
    declare userEmail: string;
    declare body: string;
    declare rate: number;
    declare universityId: number;
  }
  UniversityComments.init(
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
      modelName: "universityComments",
      timestamps: true,
    }
  );
  return UniversityComments;
};

export default createUniversityCommentsModel();
