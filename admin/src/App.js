import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './Shared/Sidebar';
import Home from './Pages/Home';
import AddStudent from './Pages/AddStudent';
import AddTeacher from './Pages/AddTeacher';
import AddAdmin from './Pages/AddAdmin';
import StudentList from './Pages/StudentList';
import EditStudent from './Pages/EditStudent';
import ChangePasswordStudent from './Pages/ChangePasswordStudent';
import TeacherList from './Pages/TeacherList';
import ChangeTeacherPassword from './Pages/ChangeTeacherPassword';
import EditTeacher from './Pages/EditTeahcer';
import ApproveStudents from './Pages/ApproveStudents';
import AdminChangePassword from './Pages/ChangePassword';
import AdminLogin from './Pages/login';
import PrivateRoute from './Pages/PrivateRoute';
import AddUpcomingIUPC from './Pages/AddUpcomingIUPC';
import AllIUPC from './Pages/AllIUPC';
import AddTeamToIUPC from './Pages/AddTeamsToIUPC';
import AllTeams from './Pages/AllTeams';
import ConfirmedStudents from './Pages/ConfirmedStudent';
import AddEvent from './Pages/AddEvent';
import AllEvents from './Pages/AllEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<AdminLogin />} />
        <Route
          exact
          path="/add-student"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add-teacher"
          element={
            <PrivateRoute>
              <AddTeacher />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/change-password-student/:studentId"
          element={
            <PrivateRoute>
              <ChangePasswordStudent />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/change-password-teacher/:teacherId"
          element={
            <PrivateRoute>
              <ChangeTeacherPassword />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/change-password"
          element={
            <PrivateRoute>
              <AdminChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add-admin"
          element={
            <PrivateRoute>
              <AddAdmin />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/student-list"
          element={
            <PrivateRoute>
              <StudentList />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/teacher-list"
          element={
            <PrivateRoute>
              <TeacherList />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edit-student/:studentId"
          element={
            <PrivateRoute>
              <EditStudent />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edit-teacher/:teacherId"
          element={
            <PrivateRoute>
              <EditTeacher />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/approve-student"
          element={
            <PrivateRoute>
              <ApproveStudents />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add-upcoming-iupc"
          element={
            <PrivateRoute>
              <AddUpcomingIUPC />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/all-iupc"
          element={
            <PrivateRoute>
              <AllIUPC />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add-teams-to-iupc"
          element={
            <PrivateRoute>
              <AddTeamToIUPC />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/all-teams"
          element={
            <PrivateRoute>
              <AllTeams />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add-event"
          element={
            <PrivateRoute>
              <AddEvent />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/all-events"
          element={
            <PrivateRoute>
              <AllEvents />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/confirmed-student"
          element={
            <PrivateRoute>
              <ConfirmedStudents />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
