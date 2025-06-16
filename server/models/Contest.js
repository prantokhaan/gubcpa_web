const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Contest = sequelize.define("Contest", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: ["Individual", "Team"],
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    batch: {
        type: DataTypes.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"],
        allowNull: false,
    }
});

module.exports = Contest;