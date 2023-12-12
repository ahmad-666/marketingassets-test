import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const createCompaniesModel = () => {
  class Companies extends Model {}
  Companies.init(
    {
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
    }
  );

  return Companies;
};

export default createCompaniesModel();
