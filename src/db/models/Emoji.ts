import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const createEmojisModel = () => {
  class Emojis extends Model {}
  Emojis.init(
    {
      parent: { type: DataTypes.TEXT, allowNull: true },
      emoji: { type: DataTypes.TEXT, allowNull: true },
      text: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      response: { type: DataTypes.TEXT, allowNull: true },
      mean: { type: DataTypes.TEXT, allowNull: true },
      marketing: { type: DataTypes.TEXT, allowNull: true },
      url: { type: DataTypes.TEXT, allowNull: true },
      emoji_list: { type: DataTypes.TEXT, allowNull: true },
      aliases: { type: DataTypes.TEXT, allowNull: true },
      internal_links: { type: DataTypes.TEXT, allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize: connection,
      modelName: "emojis",
    }
  );

  return Emojis;
};

export default createEmojisModel();
