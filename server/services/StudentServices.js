const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const Contest = require("../models/Contest");
const Iupc = require("../models/Iupc");
const Marks = require("../models/Marks");
const Student = require("../models/Student");
const Team = require("../models/Team");
const bcrypt = require("bcrypt");
const TempStudent = require("../models/TempStudent");


const allUpcomingIupc = async () => {
    try{
        const iupc = await Iupc.findAll({
            where: {
                status: "upcoming"
            }
        });
        return iupc;
    }catch(err){
        console.error("Error fetching upcoming IUPC:", err);
        throw new Error("Failed to fetch upcoming IUPC");
    }
}

const allPastIupc = async () => {
    try{
        const iupc = await Iupc.findAll({
            where: {
                status: "past"
            }
        });
        return iupc;
    }catch(err){
        console.error("Error fetching past IUPC:", err);
        throw new Error("Failed to fetch past IUPC");
    }
}

const teamsByIupc = async (iupcId) => {
    try{
        const teams = await Team.findAll({
            where: {
                iupcId: iupcId
            }
        });
        return teams;
    }catch(err){
        console.error("Error fetching teams for IUPC:", err);
        throw new Error("Failed to fetch teams for IUPC");
    }
}

const login = async (studentId, password) => {
  try {
    const user = await Student.findOne({
      where: {
        studentId: studentId,
      },
    });

    if (!user) {
      throw new Error("Invalid Student Id");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password"); // Specific message for incorrect password
    }

    return {
      id: user.studentId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      batch: user.batch,
    };
  } catch (err) {
    console.error("Error during login:", err);
    throw new Error(err.message); // This will rethrow the specific error message
  }
};


const singleStudent = async (studentId) => {
    try{
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });
        return student;
    }catch(err){
        console.error("Error fetching student:", err);
        throw new Error("Failed to fetch student");
    }
}

const editBasicInfo = async (studentId, name, phone, profilePictureUrl) => {
    try {
        console.log("profilePictureUrl:", profilePictureUrl);
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });

        if (!student) {
            throw new Error("Student not found");
        }

        student.name = name;
        student.phone = phone;
        student.profilePictureUrl = profilePictureUrl;

        await student.save();
        return student;
    } catch (err) {
        console.error("Error editing student basic info:", err);
        throw new Error("Failed to edit student basic info");
    }
}

const editOnlineJudges = async (studentId, codeforces, atcoder, vjudge, greenoj) => {
    try {
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });

        if (!student) {
            throw new Error("Student not found");
        }

        student.codeforce_handle = codeforces;
        student.atcoder_handle = atcoder;
        student.vjudge_handle = vjudge;
        student.greenoj_handle = greenoj;

        await student.save();
        return student;
    } catch (err) {
        console.error("Error editing online judges:", err);
        throw new Error("Failed to edit online judges");
    }
}

const marksForStudent = async (studentId) => {
    try{
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });
        const marks = await Marks.findAll({
            where: {
                studentId: student.id
            }
        });

        let returnMarks = [];

        for(let mark of marks){
            const contest = await Contest.findOne({
                where: {id: mark.contestId},
            });

            returnMarks.push({
                eventName: contest.name,
                marks: mark.marks,
                date: contest.date
            })
        }

        const attCount = await attendanceCountForStudent(student.studentId);

        if(student.attendance_count!=attCount){
            student.attendance_count = attCount;
            await student.save();
        }

        returnMarks.push({
            eventName: "Attendance",
            marks: attCount * 15,
            date: "N/A"
        })

        return returnMarks;
    }catch(err){
        console.error("Error fetching marks for student:", err);
        throw new Error("Failed to fetch marks for student");
    }
}

const classForStudent = async (studentId) => {
    try{
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });

        const batch = student.batch;

        const classes = await Class.findAll({
            where: {
                batch: batch
            },
            order: [['date', 'DESC']]
        });

        return classes;
    }catch(err){
        console.error("Error fetching classes for student:", err);
        throw new Error("Failed to fetch classes for student");
    }
}

const contestForStudent = async (studentId) => {
    try{
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });

        const batch = student.batch;

        const contests = await Contest.findAll({
            where: {
                batch: batch
            },
            order: [['date', 'DESC']]
        });

        return contests;
    }catch(err){
        console.error("Error fetching contests for student:", err);
        throw new Error("Failed to fetch contests for student");
    }
}

const leaderboardForStudent = async (studentId) => {
  try {
    // Fetch the student by their ID
    const student = await Student.findOne({
      where: { studentId: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const batch = student.batch;

    const marks = await Marks.findAll({
      where: { batch: batch },
    });

    const returnMarks = [];

    for (const mark of marks) {
      const student = await Student.findByPk(mark.studentId);
      const contest = await Contest.findByPk(mark.contestId);

      const attCount = await attendanceCountForStudent(student.studentId);

      if (student && contest) {
        returnMarks.push({
          id: mark.id,
          studentName: student.name,
          contestName: contest.name,
          attendance: attCount,
          marks: mark.marks,
          batch: mark.batch,
          contestDate: contest.date,
          studentId: student.studentId,
        });
      }
    }

    return returnMarks;
  } catch (err) {
    console.error("Error fetching leaderboard for student:", err);
    throw new Error("Failed to fetch leaderboard for student");
  }
};

const attendanceCountForStudent = async(studentId) => {
    try{
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });

        if (!student) {
            throw new Error("Student not found");
        }

        const id = student.id;

        const attendanceCount = await Attendance.count({
            where: {
                studentId: id,
                status: "present"
            }
        });

        return attendanceCount;
    }catch(err){
        console.error("Error fetching attendance count for student:", err);
        throw new Error("Failed to fetch attendance count for student");
    }
}
  

const attendanceForStudent = async (studentId) => {
    try{
        const student = await Student.findOne({
            where: {
                studentId: studentId
            }
        });

        const id = student.id;

        const attendance = await Attendance.findAll({
            where: {
                studentId: id
            },
            order: [['date', 'DESC']]
        });

        return attendance;
    }catch(err){
        console.error("Error fetching attendance for student:", err);
        throw new Error("Failed to fetch attendance for student");
    }
}

const isStudentIdValid = async (token, studentId) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id === studentId) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error validating student ID from token:", err);
    return false;
  }
};

const requestToRegister = async (
  name,
  studentId,
  email,
  phone,
  batch,
  password,
  idCardUrl
) => {
  try {
    const existingStudent = await Student.findOne({
      where: { studentId: studentId },
    });

    if (existingStudent) {
        console.log("Student with this ID already exists");
        throw new Error("Student with this ID already exists");
    }

    const existingEmail = await TempStudent.findOne({
      where: { email: email },
    });

    if (existingEmail) {
        console.log("Email already registered");
      throw new Error("Email already registered");
    }

    const existingPhone = await TempStudent.findOne({
      where: { phone: phone },
    });
    if (existingPhone) {
      console.log("Phone number already registered");
      throw new Error("Phone number already registered");
    }

    const existingRequest = await TempStudent.findOne({
      where: { studentId: studentId },
    });

    if (existingRequest) {
        console.log("Registration request already exists");
      throw new Error("Registration request already exists");
    }

    // If no existing student or request, create a new registration request
    const newRequest = await TempStudent.create({
      name,
      studentId,
      email,
      phone,
      batch,
      password,
      idCardUrl,
    });

    return newRequest;
  } catch (err) {
    // console.error("Error processing registration request:", err);
    throw new Error(err.message);
  }
};


module.exports = {
  allUpcomingIupc,
  allPastIupc,
  teamsByIupc,
  login,
  singleStudent,
  editBasicInfo,
  editOnlineJudges,
  marksForStudent,
  classForStudent,
  contestForStudent,
  leaderboardForStudent,
  attendanceForStudent,
  isStudentIdValid,
  requestToRegister,
};