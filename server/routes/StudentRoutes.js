const express = require('express');
const { getAllUpcomingIupc, getAllPastIupc, getTeamsByIupc, loginStudent, getSingleStudent, putBasicInfo, putOnlineJudges, getMarksForStudent, getClassForStudent, getContestForStudent, getLeaderboard, getAttendanceForStudent, studentVerification, registrationRequest, uploadImageToImgbb } = require('../controllers/StudentController');
const router = express.Router();

router.get('/all-upcoming-iupc', getAllUpcomingIupc);
router.get('/all-past-iupc', getAllPastIupc);
router.get('/teams-by-iupc/:iupcId', getTeamsByIupc);
router.post('/login', loginStudent);
router.get('/single-student/:studentId', getSingleStudent);
router.put('/edit-basic-info/:studentId', putBasicInfo);
router.put('/edit-online-judges/:studentId', putOnlineJudges);
router.get('/marks/:studentId', getMarksForStudent);
router.get('/class/:studentId', getClassForStudent);
router.get('/contest/:studentId', getContestForStudent);
router.get('/leaderboard/:studentId', getLeaderboard);
router.get('/attendance/:studentId', getAttendanceForStudent);
router.post('/verify/:studentId', studentVerification);
router.post('/registration-request', registrationRequest);
router.post('/upload-image', uploadImageToImgbb);

module.exports = router;