const {sequelize, Sequelize} = require('./db');
const { Model, DataTypes } = require('sequelize');

module.exports = sequelize.define('ToDo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    }
});