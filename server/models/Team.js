const {DataTypes, INTEGER} = require('sequelize');
const sequelize = require("../config/database");

const Team = sequelize.define("Team", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER,
    },
    iupcId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    member1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    member2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    member3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coach: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    solved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

});

module.exports = Team;