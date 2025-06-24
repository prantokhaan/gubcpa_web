const express = require('express');
const { registerAdmin, loginAdmin, addTeacher, addStudent, getAllStudents, putStudentPassword, putStudent, getSingleStudentById, deleteStudent, getAllTeachers, deleteTeacher, putTeacherPassword, putTeacher, getSingleTeacherById, putAdminPassword, createIupc, getAllIUPC, putIUPCStatus, removeIUPC, putIUPC, createTeamsToIUPC, getTeamsByIupcId, getAllTempStudents, putApproveStudent, deleteTempStudents } = require('../controllers/AdminController');

const router = express.Router();

router.post('/createAdmin', registerAdmin);
router.post('/login', loginAdmin);
router.post('/createTeacher', addTeacher);
router.post('/createStudent', addStudent);
router.get("/getAllStudents", getAllStudents);
router.put("/changeStudentPassword/:studentId", putStudentPassword);
router.put("/editStudent/:id", putStudent);
router.get("/getSingleStudent/:id", getSingleStudentById);
router.delete("/deleteStudent/:id", deleteStudent);
router.get("/getAllTeachers", getAllTeachers);
router.delete("/deleteTeacher/:id", deleteTeacher);
router.put("/changeTeacherPassword/:id", putTeacherPassword);
router.put("/editTeacher/:id", putTeacher);
router.get("/getSingleTeacher/:id", getSingleTeacherById);
router.put("/changeAdminPassword/:id", putAdminPassword);
router.post('/create-iupc', createIupc);
router.get('/getAllIUPC', getAllIUPC);
router.put('/changeIupcStatus/:id', putIUPCStatus);
router.delete('/deleteIupc/:id', removeIUPC);
router.put('/editIupc/:id', putIUPC);
router.post('/createIupcTeam/', createTeamsToIUPC);
router.get('/teamsByIupcId/:id', getTeamsByIupcId);
router.get('/getAllTempStudents', getAllTempStudents);
router.put('/approveStudent/:id', putApproveStudent);
router.delete('/deleteTempStudent/:id', deleteTempStudents);

module.exports = router;