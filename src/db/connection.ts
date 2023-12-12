import { Sequelize } from "sequelize";

let connection: Sequelize;
try {
  const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: +DB_PORT,
    dialect: "mysql",
    logging: false,
  });
  connection = sequelize;
  console.log("db connected");
} catch (err) {
  console.log("db connection fails", err);
}

export default connection;
