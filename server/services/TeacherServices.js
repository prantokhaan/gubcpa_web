const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../models/Teacher");
const { Op } = require("sequelize");
const Student = require("../models/Student");
const Contest = require("../models/Contest");
const Class = require("../models/Class");
const Marks = require("../models/Marks");
const Attendance = require("../models/Attendance");

const studentCount = async (batch) => {
    try {
        const count = await Student.count({
            where: {
                batch: batch,
            }
        });
        return count;
    } catch (error) {
        console.error("Error counting advanced students:", error);
        throw error;
    }
}

const login = async (email, password) => {
    try {
        const teacher = await Teacher.findOne({
            where: {
                email: email,
            },
        });

        if (!teacher) {
            throw new Error("Teacher not found");
        }

        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jsonwebtoken.sign(
            { id: teacher.id, email: teacher.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token, teacher };
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

const createContest = async (name, type, startTime, endTime, date, room, description, batch) => {
    try {
        const contest = await Contest.create({
            name,
            type,
            startTime,
            endTime,
            date,
            room,
            description,
            batch
        });
        return contest;
    } catch (error) {
        console.error("Error creating contest:", error);
        throw error;
    }
}

const allContests = async () => {
    try {
        const contests = await Contest.findAll();
        return contests;
    } catch (error) {
        console.error("Error fetching contests:", error);
        throw error;
    }
}

const createClass = async (name, instructor, date, startTime, endTime, room, description, batch) => {
    try {
        const newClass = await Class.create({
            name,
            instructor,
            date,
            startTime,
            endTime,
            room,
            description,
            batch
        });
        return newClass;
    } catch (error) {
        console.error("Error creating class:", error);
        throw error;
    }
}

const allTeachers = async () => {
    try {
        const teachers = await Teacher.findAll();
        return teachers;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
    }
}

const allClasses = async () => {
    try {
        const classes = await Class.findAll();
        return classes;
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw error;
    }
}

const studentsByBatch = async (batch) => {
    try {
        const students = await Student.findAll({
            where: {
                batch: batch,
            }
        });
        return students;
    } catch (error) {
        console.error("Error fetching students by batch:", error);
        throw error;
    }
}

const addMarksForStudent = async (id, marks, contestId, batch) => {
    try{
        console.log(batch);
        const contest = await Contest.findByPk(contestId);
        if (!contest) {
            throw new Error("Contest not found");
        }

        const student = await Student.findByPk(id);
        if (!student) {
            throw new Error("Student not found");
        }

        const existingMarks = await Marks.findOne({
            where: {
                studentId: id,
                contestId: contestId
            }
        });

        if (existingMarks) {
            existingMarks.marks = marks;
            await existingMarks.save();
            return existingMarks;
        } else {
            const newMarks = await Marks.create({
                studentId: id,
                contestId: contestId,
                marks: marks,
                batch: batch
            });

            const updatedStudent = await student.update(
                {marks: student.marks + marks},
            )
            return newMarks;
        }
    }catch (error) {
        console.error("Error adding marks for student:", error);
        throw error;
    }
}

const allMarksByBatch = async(batch) => {
    try{
        const marks = await Marks.findAll({
            where: {batch: batch}
        });

        const returnMarks = [];

        for (const mark of marks){
            const student = await Student.findByPk(mark.studentId);
            const contest = await Contest.findByPk(mark.contestId);

            if (student && contest) {
                returnMarks.push({
                    id: mark.id,
                    studentName: student.name,
                    contestName: contest.name,
                    marks: mark.marks,
                    batch: mark.batch,
                    contestDate: contest.date,
                });
            }
        }

        return returnMarks;
    }catch(error) {
        console.error("Error fetching all marks by batch:", error);
        throw error;
    }
}

const allMarksByBatchForLeaderboard = async (batch) => {
  try {
    const marks = await Marks.findAll({
      where: { batch: batch },
    });

    const returnMarks = [];

    for (const mark of marks) {
      const student = await Student.findByPk(mark.studentId);
      const contest = await Contest.findByPk(mark.contestId);

      if (student && contest) {
        returnMarks.push({
          id: mark.id,
          studentName: student.name,
          contestName: contest.name,
          attendance: student.attendance_count,
          marks: mark.marks,
          batch: mark.batch,
          contestDate: contest.date,
        });
      }
    }

    return returnMarks;
  } catch (error) {
    console.error("Error fetching all marks by batch:", error);
    throw error;
  }
};

const addAttendance = async (studentId, date, status) => {
    try{
        const student = await Student.findByPk(studentId);
        if (!student) {
            throw new Error("Student not found");
        }

        console.log(date);

        // const compareDate = date + "00:00:";

        const existingAttendance = await Attendance.findOne({
            where: {
                studentId: studentId,
                date: date
            }
        });
        if (existingAttendance) {
            throw new Error("Attendance for this student on this date already exists");
        }

        const attendance = await Attendance.create({
            studentId: studentId,
            date: date,
            status: status,
        });

        if (status === 'present') {
            await student.update({
                attendance_count: student.attendance_count + 1
            })
        }
        return attendance;
    }catch (error) {
        console.error("Error adding attendance:", error);
        throw error;
    }
}

const allAttendancesByBatch = async (batch) => {
    try {
        const attendances = await Attendance.findAll();

        const returnAttendances = [];
        for (const attendance of attendances) {
            const student = await Student.findByPk(attendance.studentId);
            if (student && student.batch === batch) {
                returnAttendances.push({
                    id: attendance.id,
                    studentName: student.name,
                    studentId: student.studentId,
                    email: student.email,
                    date: attendance.date,
                    status: attendance.status,
                });
            }
        }
        return returnAttendances;
    } catch (error) {
        console.error("Error fetching all attendances by batch:", error);
        throw error;
    }
}

module.exports = {
  studentCount,
  login,
  createContest,
  allContests,
  createClass,
  allTeachers,
  allClasses,
  addMarksForStudent,
  studentsByBatch,
  allMarksByBatch,
  allMarksByBatchForLeaderboard,
  addAttendance,
  allAttendancesByBatch
};