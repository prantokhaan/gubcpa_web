const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const { batch } = require('react-redux');

const Student = sequelize.define("Student", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    },
    marks: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    codeforce_handle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    codechef_handle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    atcoder_handle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vjudge_handle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    greenoj_handle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePictureUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    attendance_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]+$/i
        }
    }
});

module.exports = Student;