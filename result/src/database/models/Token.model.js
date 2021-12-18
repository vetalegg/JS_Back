const {sequelize} = require("../index");
const {Sequelize} = require("sequelize");

class Token extends Sequelize.Model {
}

Token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
        },
        value: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
    },
    {sequelize: sequelize, modelName: "token"}
);

module.exports = Token;
