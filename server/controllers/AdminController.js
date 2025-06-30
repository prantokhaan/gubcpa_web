const jsonwebtoken = require("jsonwebtoken");
const { createAdmin, login, createTeacher, createStudent, allStudents, changePasswordStudent, singleStudentById, editStudent, removeStudent, allTeachers, removeTeacher, changePasswordTeacher, editTeacher, singleTeacherById, changeAdminPassword, addIupc, allIupc, changeIupcStatus, addTeamsToIupc, editIUPC, deleteIUPC, teamsByIupcId, allTempStudents, approveStudent, rejectTempStudent, deleteIupcTeam, editIupcTeam, addEvent, changeEventStatus, editEvent, deleteEvent, allEvents } = require("../services/AdminServices");

const registerAdmin = async (req, res) => {
    const {name, email, phone, password} = req.body;

    try{
        const newAdmin = await createAdmin(name, email, phone, password);

        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: newAdmin.id,
                name: newAdmin.name,
                email: newAdmin.email,
                phone: newAdmin.phone
            }
        });
    }catch(err){
        console.error("Error registering admin:", err);
        res.status(500).json({
            message: "Failed to register admin"
        });
    }
}

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const admin = await login(email, password);

        const token = jsonwebtoken.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token: token,
            admin: {
                id: admin.id,
                email: admin.email,
                phone: admin.phone
            }
        });
    } catch (err) {
        console.error("Error logging in admin:", err);
        res.status(401).json({
            message: "Invalid email or password"
        });
    }
}

const addTeacher = async (req, res) => {
    try{
        const {name, email, phone, batch, password} = req.body;

        const newTeacher = await createTeacher(name, email, phone, batch, password);

        res.status(201).json({
            message: "Teacher created successfully",
            teacher: {
                id: newTeacher.id,
                name: newTeacher.name,
                email: newTeacher.email,
                phone: newTeacher.phone,
                batch: newTeacher.batch
            }
        });
    }catch(err) {
        console.error("Error creating teacher:", err);
        res.status(500).json({
            message: "Failed to create teacher"
        });
    }
}

const addStudent = async (req, res) => {
    try{
        const {name, email, phone, batch, studentId, password} = req.body;

        const newStudent = await createStudent(
          name,
          email,
          phone,
          batch,
          studentId,
          password
        );

        res.status(201).json({
            message: "Student created successfully",
            student: {
                id: newStudent.id,
                name: newStudent.name,
                email: newStudent.email,
                phone: newStudent.phone,
                batch: newStudent.batch,
                studentId: newStudent.studentId,
            }
        });
    }catch(err) {
        console.error("Error creating student:", err);
        res.status(500).json({
            message: "Failed to create student"
        });
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await allStudents();
        res.status(200).json({
            message: "Students fetched successfully",
            students: students
        });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
}

const putStudentPassword = async (req, res) => {
    const {newPassword} = req.body;
    const {studentId} = req.params;

    try{
        await changePasswordStudent(studentId, newPassword);
        res.status(200).json({
            message: "Password changed successfully"
        });
    }catch(err){
        console.error("Error changing password:", err);
        res.status(500).json({
            message: "Failed to change password"
        });
    }
}

const putStudent = async (req, res) => {
    const {name, email, phone, batch, studentId} = req.body;
    const {id} = req.params;

    try {
        const student = await editStudent(id, studentId, name, email, phone, batch);
        res.status(200).json({
            message: "Student updated successfully",
            student: student
        });
    } catch (err) {
        console.error("Error updating student:", err);
        res.status(500).json({
            message: "Failed to update student"
        });
    }
}

const getSingleStudentById = async (req, res) => {
    const {id} = req.params;

    try{
        const student = await singleStudentById(id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json({
            message: "Student fetched successfully",
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                batch: student.batch,
                studentId: student.studentId
            }
        });
    }catch(err) {
        console.error("Error fetching student:", err);
        res.status(500).json({
            message: "Failed to fetch student"
        });
    }

}

const deleteStudent = async (req, res) => {
    const {id} = req.params;

    try{
        await removeStudent(id);

        res.status(200).json({
            message: "Student deleted successfully"
        });
    }catch(err){
        console.error("Error deleting student:", err);
        res.status(500).json({
            message: "Failed to delete student"
        });
    }
}

const getAllTeachers = async (req, res) => {
    try{
        const teachers = await allTeachers();
        res.status(200).json({
            message: "Teachers fetched successfully",
            teachers: teachers
        });
    }catch(err){
        console.error("Error fetching teachers:", err);
        res.status(500).json({
            message: "Failed to fetch teachers"
        });
    }
}

const deleteTeacher = async (req, res) => {
    const {id} = req.params;

    try{
        await removeTeacher(id);

        res.status(200).json({
            message: "Teacher deleted successfully"
        });
    }catch(err){
        console.error("Error deleting teacher:", err);
        res.status(500).json({
            message: "Failed to delete teacher"
        });
    }
}

const putTeacherPassword = async (req, res) => {
    const {newPassword} = req.body;
    const {id} = req.params;

    try{
        await changePasswordTeacher(id, newPassword);
        res.status(200).json({
            message: "Password changed successfully"
        });
    }catch(err){
        console.error("Error changing password:", err);
        res.status(500).json({
            message: "Failed to change password"
        });
    }
}

const putTeacher = async (req, res) => {
    const {name, email, batch} = req.body;
    const {id} = req.params;

    try {
        const teacher = await editTeacher(id, name, email, batch);
        res.status(200).json({
            message: "Teacher updated successfully",
            teacher: teacher
        });
    } catch (err) {
        console.error("Error updating teacher:", err);
        res.status(500).json({
            message: "Failed to update teacher"
        });
    }
}

const getSingleTeacherById = async (req, res) => {
    const {id} = req.params;

    try{
        const teacher = await singleTeacherById(id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        res.status(200).json({
            message: "Teacher fetched successfully",
            teacher: {
                id: teacher.id,
                name: teacher.name,
                email: teacher.email,
                phone: teacher.phone,
                batch: teacher.batch
            }
        });
    }catch(err) {
        console.error("Error fetching teacher:", err);
        res.status(500).json({
            message: "Failed to fetch teacher"
        });
    }
}

const putAdminPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const {id} = req.params;

    try{
        await changeAdminPassword(id, oldPassword, newPassword);
        res.status(200).json({
            message: "Password changed successfully"
        });
    }catch(err){
        console.error("Error changing password:", err);
        res.status(500).json({
            message: "Failed to change password"
        });
    }
}

const createIupc = async (req, res) => {
    const {name, description, contestDate, registrationDeadline, registrationLink} = req.body;

    console.log("Creating IUPC with data:", req.body);

    try{
        const newIupc = await addIupc(name, description, contestDate, registrationDeadline, registrationLink);

        res.status(201).json({
            message: "IUPC created successfully",
            iupc: {
                id: newIupc.id,
                name: newIupc.name,
                description: newIupc.description,
                contestDate: newIupc.contestDate,
                registrationDeadline: newIupc.registrationDeadline,
                registrationLink: newIupc.registrationLink
            }
        });
    } catch (err) {
        console.error("Error creating IUPC:", err);
        res.status(500).json({
            message: "Failed to create IUPC"
        });
    }
}

const getAllIUPC = async (req, res) => {
    try {
        const iupcs = await allIupc();
        res.status(200).json({
            message: "IUPCs fetched successfully",
            iupcs: iupcs
        });
    } catch (err) {
        console.error("Error fetching IUPCs:", err);
        res.status(500).json({
            message: "Failed to fetch IUPCs"
        });
    }
}

const putIUPCStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try {
        const updatedIupc = await changeIupcStatus(id, status);
        res.status(200).json({
            message: "IUPC status updated successfully",
            iupc: updatedIupc
        });
    } catch (err) {
        console.error("Error updating IUPC status:", err);
        res.status(500).json({
            message: "Failed to update IUPC status"
        });
    }
}

const createTeamsToIUPC = async (req, res) => {
    const {name, member1, member2, member3, coach, rank, solved, iupcId} = req.body;

    try {
        const updatedIupc = await addTeamsToIupc(name, member1, member2, member3, coach, rank, solved, iupcId);
        res.status(200).json({
            message: "Teams added to IUPC successfully",
            iupc: updatedIupc
        });
    } catch (err) {
        console.error("Error adding teams to IUPC:", err);
        res.status(500).json({
            message: "Failed to add teams to IUPC"
        });
    }
}

const getTeamsByIupcId = async (req, res) => {
    const {id} = req.params;

    try {
        const teams = await teamsByIupcId(id);
        res.status(200).json({
            message: "Teams fetched successfully",
            teams: teams
        });
    } catch (err) {
        console.error("Error fetching teams:", err);
        res.status(500).json({
            message: "Failed to fetch teams"
        });
    }
}

const putIUPC = async (req, res) => {
    const {id} = req.params;
    const {
      name,
      description,
      contestDate,
      registrationDeadline,
      registrationLink,
      totalTeams,
      gubRank,
    } = req.body;

    try {
        const updatedIupc = await editIUPC(
          id,
          name,
          description,
          contestDate,
          registrationDeadline,
          registrationLink,
          totalTeams,
          gubRank
        );
        res.status(200).json({
            message: "IUPC updated successfully",
            iupc: updatedIupc
        });
    } catch (err) {
        console.error("Error updating IUPC:", err);
        res.status(500).json({
            message: "Failed to update IUPC"
        });
    }
}

const removeIUPC = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteIUPC(id);
        res.status(200).json({
            message: "IUPC deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting IUPC:", err);
        res.status(500).json({
            message: "Failed to delete IUPC"
        });
    }
}

const getAllTempStudents = async (req, res) => {
    try {
        const students = await allTempStudents();
        res.status(200).json({
            message: "Students fetched successfully",
            students: students
        });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
}

const putApproveStudent = async (req, res) => {
    const {id} = req.params;

    try {
        const student = await approveStudent(id);
        res.status(200).json({
            message: "Student approved successfully",
            student: student
        });
    } catch (err) {
        console.error("Error approving student:", err);
        res.status(500).json({
            message: "Failed to approve student"
        });
    }
}

const deleteTempStudents = async (req, res) => {
    const {id} = req.params;

    try {
        await rejectTempStudent(id);
        res.status(200).json({
            message: "Temporary student deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting temporary student:", err);
        res.status(500).json({
            message: "Failed to delete temporary student"
        });
    }
}

const removeIupcTeam = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteIupcTeam(id);
        res.status(200).json({
            message: "IUPC team deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting IUPC team:", err);
        res.status(500).json({
            message: "Failed to delete IUPC team"
        });
    }
}

const putIUPCTeam = async (req, res) => {
    const {id} = req.params;
    const {name, member1, member2, member3, coach, rank, solved} = req.body;

    try {
        const updatedTeam = await editIupcTeam(id, name, member1, member2, member3, coach, rank, solved);
        res.status(200).json({
            message: "IUPC team updated successfully",
            team: updatedTeam
        });
    } catch (err) {
        console.error("Error updating IUPC team:", err);
        res.status(500).json({
            message: "Failed to update IUPC team"
        });
    }
}

const addNewEvent = async (req, res) => {
    const {title, date, type, status, bgImageLink} = req.body;

    try {
        const newEvent = await addEvent(title, date, type, status, bgImageLink);
        res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({
            message: "Failed to create event"
        });
    }
}

const putEventStatus = async (req, res) => {
    const {id} = req.params;
    const {status, bgImageLink} = req.body;

    try {
        const updatedEvent = await changeEventStatus(id, status, bgImageLink);
        res.status(200).json({
            message: "Event status updated successfully",
            event: updatedEvent
        });
    } catch (err) {
        console.error("Error updating event status:", err);
        res.status(500).json({
            message: "Failed to update event status"
        });
    }
}

const putEvent = async (req, res) => {
    const {id} = req.params;
    const {title, date, type, status, bgImageLink} = req.body;

    try {
        const updatedEvent = await editEvent(id, title, date, type, status, bgImageLink);
        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });
    } catch (err) {
        console.error("Error updating event:", err);
        res.status(500).json({
            message: "Failed to update event"
        });
    }
}

const removeEvent = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteEvent(id);
        res.status(200).json({
            message: "Event deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({
            message: "Failed to delete event"
        });
    }
}

const getAllEvents = async (req, res) => {
    try{
        const events = await allEvents();
        res.status(200).json({
            message: "Events fetched successfully",
            events: events
        });
    }catch(err) {
        console.error("Error fetching events:", err);
        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    addTeacher,
    addStudent,
    getAllStudents,
    putStudentPassword,
    putStudent,
    getSingleStudentById,
    deleteStudent,
    getAllTeachers,
    deleteTeacher,
    putTeacherPassword,
    putTeacher,
    getSingleTeacherById,
    putAdminPassword,
    createIupc,
    getAllIUPC,
    putIUPCStatus,
    createTeamsToIUPC,
    putIUPC,
    removeIUPC,
    getTeamsByIupcId,
    getAllTempStudents,
    putApproveStudent,
    deleteTempStudents,
    removeIupcTeam,
    putIUPCTeam,
    addNewEvent,
    putEventStatus,
    putEvent,
    removeEvent,
    getAllEvents
};
