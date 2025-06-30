const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('workshop', 'contest', 'orientation', 'ceremony', 'exam', 'other'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'past'),
        allowNull: false,
        defaultValue: 'upcoming',
    },
    bgImageLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Event;