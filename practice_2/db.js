const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.BDPASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});
let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;