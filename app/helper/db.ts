import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";
//mysql2 is main package for create connection to db , sequelize is ORM for sql

type DB = {
  initialized: boolean;
  initialize: () => Promise<void>;
  Emoji: any;
  Company: any;
};
export const db: DB = {
  initialized: false,
  initialize,
  Emoji: null,
  Company: null,
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
  db.Company = companyModel(sequelize);
  //sync all models with database
  await sequelize.sync({ alter: false });
  db.initialized = true;
  //init models and add them to the exported db object
}

// sequelize models with schema definitions
function emojiModel(sequelize) {
  const attributes = {
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
function companyModel(sequelize) {
  const attributes = {
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
  };
  return sequelize.define("company", attributes, {});
}
