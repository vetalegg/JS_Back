const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  database: "postgres",
  username: "postgres",
  password: "password",
});

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database");
    throw error;
  }
}

module.exports = {
  initDatabase,
  sequelize,
};
