const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define("Attendance", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Present', 'Absent'],
        allowNull: false
    }
});

Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
    });
};

module.exports = Attendance;