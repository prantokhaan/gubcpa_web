import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Pages/Auth/PrivateRoute"; 
import Home from "./Pages/Home/Home";
import TeacherLogin from "./Pages/Auth/Login";
import AdvancedOverview from "./Pages/Advanced/Overview";
import AdvancedTakeAttendance from "./Pages/Advanced/AdvancedTakeAttendance";
import AdvancedMarks from "./Pages/Advanced/AdvancedMarks";
import AdvancedClassSchedule from "./Pages/Advanced/AdvancedClassSchedule";
import AdvancedContestSchedule from "./Pages/Advanced/AdvancedContestSchedule";
import AdvancedLeaderboard from "./Pages/Advanced/AdvancedLeaderboard";
import AdvancedContestTeam from "./Pages/Advanced/AdvancedContestTeam";
import AdvancedAttendance from "./Pages/Advanced/AdvancedAttendance";
import AdvancedAddMarks from "./Pages/Advanced/AdvancedAddMarks";
import AdvancedAddClass from "./Pages/Advanced/AdvancedAddClass";
import AdvancedAddContest from "./Pages/Advanced/AdvancedAddContest";
import AdvancedPickContestTeam from "./Pages/Advanced/PickContestTeam";
import AdvancedAllStudents from "./Pages/Advanced/AdvancedAllStudents";
import AdvancedUpdateAttendance from "./Pages/Advanced/AdvancedUpdateAttendance";
import InterAddClass from "./Pages/Intermediate/InterAddClass";
import InterAddContest from "./Pages/Intermediate/InterAddContest";
import InterAddMarks from "./Pages/Intermediate/InterAddMarks";
import InterAllStudents from "./Pages/Intermediate/InterAllStudents";
import InterAttendance from "./Pages/Intermediate/InterAttendance";
import InterClassSchedule from "./Pages/Intermediate/InterClassSchedule";
import InterContestSchedule from "./Pages/Intermediate/InterContestSchedule";
import InterContestTeam from "./Pages/Intermediate/InterContestTeam";
import InterMarks from "./Pages/Intermediate/InterMarks";
import InterTakeAttendance from "./Pages/Intermediate/InterTakeAttendance";
import InterUpdateAttendance from "./Pages/Intermediate/InterUpdateAttendance";
import InterPickContestTeam from "./Pages/Intermediate/InterPickContestTeam";
import BegAddClass from "./Pages/Beginner/BegAddClass";
import BegAddContest from "./Pages/Beginner/BegAddContest";
import BegAddMarks from "./Pages/Beginner/BegAddMarks";
import BegAllStudents from "./Pages/Beginner/BegAllStudents";
import BegAttendance from "./Pages/Beginner/BegAttendance";
import BegClassSchedule from "./Pages/Beginner/BegClassSchedule";
import BegContestSchedule from "./Pages/Beginner/BegContestSchedule";
import BegContestTeam from "./Pages/Beginner/BeginnerContestTeam";
import BegLeaderboard from "./Pages/Intermediate/BegLeaderboard";
import BegMarks from "./Pages/Beginner/BegMarks";
import BegTakeAttendance from "./Pages/Beginner/BegTakeAttendance";
import BegUpdateAttendance from "./Pages/Beginner/BegUpdateAttendance";
import BegPickContestTeam from "./Pages/Beginner/BegPickContestTeam";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<TeacherLogin />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-overview" element={<AdvancedOverview />} />
          <Route
            path="/a-take-attendance"
            element={<AdvancedTakeAttendance />}
          />
          <Route path="/a-marks" element={<AdvancedMarks />} />
          <Route path="/a-class-schedule" element={<AdvancedClassSchedule />} />
          <Route
            path="/a-contest-schedule"
            element={<AdvancedContestSchedule />}
          />
          <Route path="/a-leaderboard" element={<AdvancedLeaderboard />} />
          <Route path="/a-contest-team" element={<AdvancedContestTeam />} />
          <Route path="/a-attendance" element={<AdvancedAttendance />} />
          <Route path="/a-add-marks" element={<AdvancedAddMarks />} />
          <Route path="/a-add-class" element={<AdvancedAddClass />} />
          <Route path="/a-add-contest" element={<AdvancedAddContest />} />
          <Route
            path="/a-pick-contest-team"
            element={<AdvancedPickContestTeam />}
          />
          <Route path="/a-students-list" element={<AdvancedAllStudents />} />
          <Route
            path="/a-update-attendance"
            element={<AdvancedUpdateAttendance />}
          />

          <Route path="/i-add-class" element={<InterAddClass />} />
          <Route path="/i-add-contest" element={<InterAddContest />} />
          <Route path="/i-add-marks" element={<InterAddMarks />} />
          <Route path="/i-students-list" element={<InterAllStudents />} />
          <Route path="/i-attendance" element={<InterAttendance />} />
          <Route path="/i-class-schedule" element={<InterClassSchedule />} />
          <Route
            path="/i-contest-schedule"
            element={<InterContestSchedule />}
          />
          <Route path="/i-contest-team" element={<InterContestTeam />} />
          <Route path="/i-leaderboard" element={<InterContestTeam />} />
          <Route path="/i-marks" element={<InterMarks />} />
          <Route path="/i-take-attendance" element={<InterTakeAttendance />} />
          <Route
            path="/i-update-attendance"
            element={<InterUpdateAttendance />}
          />
          <Route
            path="/i-pick-contest-team"
            element={<InterPickContestTeam />}
          />

          {/* Beginner Routes */}
          <Route path="/b-add-class" element={<BegAddClass />} />
          <Route path="/b-add-contest" element={<BegAddContest />} />
          <Route path="/b-add-marks" element={<BegAddMarks />} />
          <Route path="/b-students-list" element={<BegAllStudents />} />
          <Route path="/b-attendance" element={<BegAttendance />} />
          <Route path="/b-class-schedule" element={<BegClassSchedule />} />
          <Route path="/b-contest-schedule" element={<BegContestSchedule />} />
          <Route path="/b-contest-team" element={<BegContestTeam />} />
          <Route path="/b-leaderboard" element={<BegLeaderboard />} />
          <Route path="/b-marks" element={<BegMarks />} />
          <Route path="/b-take-attendance" element={<BegTakeAttendance />} />
          <Route
            path="/b-update-attendance"
            element={<BegUpdateAttendance />}
          />
          <Route path="/b-pick-contest-team" element={<BegPickContestTeam />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
