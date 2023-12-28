import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const createEmojiCommentsModel = () => {
  class EmojiComments extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare userName: string;
    declare userEmail: string;
    declare body: string;
    declare rate: number;
    declare emojiId: number;
  }
  EmojiComments.init(
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
      emojiId: {
        type: DataTypes.BIGINT, //this should match the type of data.emojis.url
        allowNull: false,
        references: {
          model: "emojis", // table name
          key: "id", // column name
        }, //references is used to set foreign keys
      },
    },
    {
      sequelize: connection,
      modelName: "emojiComments",
      timestamps: true,
    }
  );
  return EmojiComments;
};

export default createEmojiCommentsModel();