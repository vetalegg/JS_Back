require("dotenv").config();
module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",

  development: {
    db: {
      host: 'localhost',
      dialect: 'postgres',
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
    }
  },
  production: {
    db: {
      host: 'localhost',
      dialect: 'postgres',
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
    }
  }
};