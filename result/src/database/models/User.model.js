const {sequelize} = require("..");
const {Sequelize} = require("sequelize");
const Token = require("./Token.model");
const ToDo = require("./ToDo.model");

class User extends Sequelize.Model {
}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
        },
        login: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "User",
        },
    },
    {sequelize: sequelize, modelName: "user"}
);

User.hasMany(Token);

Token.belongsTo(User, {
    foreignKey: "userId",
});

User.hasMany(ToDo);

ToDo.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = User;
