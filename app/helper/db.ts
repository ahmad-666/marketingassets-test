import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";
//mysql2 is main package for create connection to db , sequelize is ORM for sql

type DB = {
  initialized: boolean;
  initialize: () => Promise<void>;
  Emoji: any;
};
export const db: DB = {
  initialized: false,
  initialize,
  Emoji: null,
};

async function initialize() {
  //its possible that we see we init db multiple times on dev-mode but no problem and on production we only init db one time.
  //will call from the api handler when the first request is sent to the API
  const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: +DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
  });
  //await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  // connect to db
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: +DB_PORT,
    dialect: "mysql",
  });
  db.Emoji = emojiModel(sequelize);
  //sync all models with database
  await sequelize.sync({ alter: true });
  db.initialized = true;
  //init models and add them to the exported db object
}

// sequelize models with schema definitions
function emojiModel(sequelize) {
  const attributes = {
    parent: { type: DataTypes.STRING, allowNull: true },
    emoji: { type: DataTypes.STRING, allowNull: true },
    text: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    response: { type: DataTypes.STRING, allowNull: true },
    mean: { type: DataTypes.STRING, allowNull: true },
    marketing: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    emoji_list: { type: DataTypes.STRING, allowNull: true },
    aliases: { type: DataTypes.STRING, allowNull: true },
    internal_links: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: true },
    //id: { type: DataTypes.BIGINT, allowNull: false }, //sequelize automatically add it as primary key
  };
  //   const options = {
  //     defaultScope: {  // exclude password hash by default
  //       attributes: { exclude: ["hash"] },
  //     },
  //     scopes: { // include hash with this scope
  //       withHash: { attributes: {} },
  //     },
  //   };
  return sequelize.define("emoji", attributes, {});
}
