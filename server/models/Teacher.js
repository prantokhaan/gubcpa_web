const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Teacher = sequelize.define("Teacher", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]+$/i
        }
    },
    batch: {
        type: DataTypes.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"],
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100] 
        }
    }
});

module.exports = Teacher;