import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import type {
  CompanyTableAttribute,
  CompanyTableCreationAttribute,
} from "@/src/types/Company";

const createCompaniesModel = () => {
  class Companies extends Model<
    CompanyTableAttribute,
    CompanyTableCreationAttribute
  > {
    declare id: number;
    declare name: string;
    declare overview: string;
    declare country: string;
    declare domain: string;
    declare linkedin: string;
    declare twitter: string;
    declare facebook: string;
    declare size: string;
    declare founded: number;
    declare industry: string;
    declare followers_count: number;
  }
  Companies.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      overview: { type: DataTypes.TEXT, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: false },
      domain: { type: DataTypes.STRING, allowNull: false },
      linkedin: { type: DataTypes.STRING, allowNull: false },
      twitter: { type: DataTypes.STRING, allowNull: false },
      facebook: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: false },
      founded: { type: DataTypes.INTEGER, allowNull: false },
      industry: { type: DataTypes.STRING, allowNull: false },
      followers_count: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize: connection,
      modelName: "companies",
      timestamps: false,
    }
  );

  return Companies;
};

export default createCompaniesModel();
