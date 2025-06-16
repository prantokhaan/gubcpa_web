const express = require("express");
const { getStudentCount, teacherLogin, addContest, getAllContests, addClass, getAllTeachers, getAllClasses, getStudentByBatch, increaseMarksForStudent, getAllMarksByBatch, getAllMarksByBatchForLeaderboard, takeAttendance, getAllAttendanceByBatch } = require("../controllers/TeacherController");
const router = express.Router();

router.get("/studentCount/:batch", getStudentCount);
router.post("/login", teacherLogin);
router.post("/addContest", addContest);
router.get("/getAllContests", getAllContests);
router.post("/addClass", addClass);
router.get("/getAllTeachers", getAllTeachers);
router.get("/getAllClasses", getAllClasses);
router.get("/getStudentByBatch/:batch", getStudentByBatch);
router.post("/increaseMarksForStudent", increaseMarksForStudent);
router.get("/getAllMarksByBatch/:batch", getAllMarksByBatch);
router.get("/getAllMarksByBatchForLeaderboard/:batch", getAllMarksByBatchForLeaderboard);
router.post("/takeAttendance", takeAttendance);
router.get("/getAllAttendanceByBatch/:batch", getAllAttendanceByBatch);

module.exports = router;