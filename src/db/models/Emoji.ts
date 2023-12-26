import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const createEmojisModel = () => {
  class Emojis extends Model {
    declare id: number;
    declare parent: string;
    declare emoji: string;
    declare text: string;
    declare description: string;
    declare response: string;
    declare mean: string;
    declare marketing: string;
    declare url: string;
    declare emoji_list: string;
    declare aliases: string;
    declare internal_links: string;
    declare score: number;
  } //Emojis will be data type , data types that we use here will be used for typescript and can be different from DataTypes that we set bellow e.g 'aliases' is string like '["a","b"]' in db so we use DataTypes.TEXT for it but we say its typescript type is string[] because we convert it to array of string when we return it from api route
  Emojis.init(
    {
      //each column can have these data:
      //type,allowNull,primaryKey,autoIncrement,unique,references,defaultValue,field,onUpdate,onDelete
      id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
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
    }, //here we say schema of emojis table in db , nothing to do with typescript
    {
      sequelize: connection,
      modelName: "emojis", //name of table in db
      timestamps: false,
    }
  );

  return Emojis;
};

export default createEmojisModel();
