import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const createCompanyCommentsModel = () => {
  class CompanyComments extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userName: string;
    declare userEmail: string;
    declare body: string;
    declare rate: number;
    declare companyId: number;
  }
  CompanyComments.init(
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
      companyId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
      },
    },
    {
      sequelize: connection,
      modelName: "companyComments",
      timestamps: true,
    }
  );
  return CompanyComments;
};

export default createCompanyCommentsModel();
