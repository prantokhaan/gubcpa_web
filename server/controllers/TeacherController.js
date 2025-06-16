const { get } = require("../routes/TeacherRoutes");
const { allTeachers } = require("../services/AdminServices");
const {
  studentCount,
  login,
  createContest,
  allContests,
  createClass,
  allClasses,
  studentsByBatch,
  addMarksForStudent,
  allMarksByBatch,
  allMarksByBatchForLeaderboard,
  addAttendance,
  allAttendancesByBatch,
} = require("../services/TeacherServices");

const getStudentCount = async (req, res) => {
  try {
    const count = await studentCount(req.params.batch);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, teacher } = await login(email, password);
    res.status(200).json({ token, teacher });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ error: "Invalid email or password" });
  }
};

const addContest = async (req, res) => {
  const { name, type, startTime, endTime, date, room, description, batch } =
    req.body;

  try {
    const contest = await createContest(
      name,
      type,
      startTime,
      endTime,
      date,
      room,
      description,
      batch
    );
    res.status(201).json({ contest });
  } catch (error) {
    console.error("Error creating contest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllContests = async (req, res) => {
  try {
    const contests = await allContests();
    if (!contests || contests.length === 0) {
      return res.status(404).json({ message: "No contests found" });
    }
    res.status(200).json({ contests });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addClass = async (req, res) => {
  const {
    name,
    instructor,
    date,
    startTime,
    endTime,
    room,
    description,
    batch,
  } = req.body;

  try {
    const classData = await createClass(
      name,
      instructor,
      date,
      startTime,
      endTime,
      room,
      description,
      batch
    );
    res.status(201).json({ class: classData });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await allTeachers();
        if (!teachers || teachers.length === 0) {
        return res.status(404).json({ message: "No teachers found" });
        }
        res.status(200).json({ teachers });
    } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllClasses = async (req, res) => {
  try {
    const classes = await allClasses();
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }
    res.status(200).json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentByBatch = async (req, res) => {
  const { batch } = req.params;

  try {
    const students = await studentsByBatch(batch);
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students by batch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const increaseMarksForStudent = async (req, res) => {
  const {id, marks, contestId, batch} = req.body;

  try{
    const updatedStudent = await addMarksForStudent(id, marks, contestId, batch);
    res.status(200).json({ student: updatedStudent });
  }catch (error) {
    console.error("Error increasing marks for student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getAllMarksByBatch = async (req, res) => {
  const {batch} = req.params;

  try{
    const marks = await allMarksByBatch(batch);

    if (!marks || marks.length === 0) {
      return res.status(404).json({ message: "No marks found for this batch" });
    }

    res.status(200).json({ marks });
  } catch (error) {
    console.error("Error fetching all marks by batch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getAllMarksByBatchForLeaderboard = async (req, res) => {
  const { batch } = req.params;

  try {
    const marks = await allMarksByBatchForLeaderboard(batch);

    if (!marks || marks.length === 0) {
      return res.status(404).json({ message: "No marks found for this batch" });
    }

    res.status(200).json({ marks });
  } catch (error) {
    console.error("Error fetching all marks by batch for leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const takeAttendance = async (req, res) => {
  const {studentId, date, status} = req.body;

  try{
    const attendance = await addAttendance(studentId, date, status);
    res.status(201).json({ attendance });
  }catch(error) {
    console.error("Error taking attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getAllAttendanceByBatch = async (req, res) => {
  const { batch } = req.params;

  try {
    const attendance = await allAttendancesByBatch(batch);
    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this batch" });
    }
    res.status(200).json({ attendance });
  } catch (error) {
    console.error("Error fetching attendance by batch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getStudentCount,
  teacherLogin,
  addContest,
  getAllContests,
  addClass,
  getAllTeachers,
  getAllClasses,
  takeAttendance,
  getStudentByBatch,
  increaseMarksForStudent,
  getAllMarksByBatch,
  getAllMarksByBatchForLeaderboard,
  getAllAttendanceByBatch
};
