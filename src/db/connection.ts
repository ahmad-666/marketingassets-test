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
  sequelize.sync({
    alter: false, //checks what is the current state of the table in the database (which columns, which data types, etc), and then performs the necessary changes in the table to make it match the model.
    force: false, //creates the table, dropping it first if it already existed
    logging: false, //disable logger
  });
  connection = sequelize;
  console.log("db connected");
} catch (err) {
  console.log("db connection fails", err);
}

export default connection;
