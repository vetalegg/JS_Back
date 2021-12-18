const {sequelize} = require("..");
const {Sequelize} = require("sequelize");

class ToDo extends Sequelize.Model {
}

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Title",
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "",
        },
        isDone: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isFavourite: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        priority: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {sequelize: sequelize, modelName: "todo"}
);

module.exports = ToDo;
