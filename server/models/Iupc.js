const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Iupc = sequelize.define('Iupc', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contestDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    registrationDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    registrationLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalTeams: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    gubRank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    teamInfo: {
        type: DataTypes.JSON,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'past'),
        allowNull: false,
        defaultValue: 'upcoming'
    }
});

module.exports = Iupc;