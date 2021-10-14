module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ToDo', {
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
};