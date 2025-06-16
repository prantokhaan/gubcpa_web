const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Marks = sequelize.define("Marks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students',
            key: 'id'
        }
    },
    contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Contests',
            key: 'id'
        }
    },
    marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    batch: {
        type: DataTypes.ENUM,
        values: ['Advanced', 'Intermediate', 'Beginner'],
        allowNull: false,
    }
});

Marks.associate = (models) => {
    Marks.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
    });
    Marks.belongsTo(models.Contest, {
        foreignKey: 'contestId',
        as: 'contest'
    });
}

module.exports = Marks;