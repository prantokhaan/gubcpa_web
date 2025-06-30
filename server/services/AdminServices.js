const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Iupc = require("../models/Iupc");
const Team = require("../models/Team");
const bcrypt = require("bcrypt");
const {Op} = require("sequelize");
const { desc } = require("framer-motion/client");
const TempStudent = require("../models/TempStudent");
const Event = require("../models/Event");


const createAdmin = async (name, email, phone, password) => {
    try{
        const existingAdmin = await Admin.findOne({
            where: {
                [Op.or]: [
                    {email: email},
                    {phone: phone}
                ]
            }
        });

        if(existingAdmin) {
            throw new Error("Admin with this email or phone already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        });

        return {
            id: newAdmin.id,
            email: newAdmin.email,
            phone: newAdmin.phone
        };
    }catch(err){
        console.error("Error creating admin:", err);
        throw new Error("Failed to create admin");
    }
}

const login = async (email, password) => {
    try{
        const admin = await Admin.findOne({ where: { email: email } });

        if(!admin) {
            throw new Error("Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if(!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return {
            id: admin.id,
            email: admin.email,
            phone: admin.phone
        };
    }catch(err){
        console.error("Error logging in:", err);
        throw new Error("Failed to log in");
    }
}

const createTeacher = async (name, email, phone, batch, password) => {
    try{
        const existingTeacher = await Teacher.findOne({
            where: {
                [Op.or]: [
                    {email: email},
                    {phone: phone}
                ]
            }
        });

        if(existingTeacher) {
            throw new Error("Teacher with this email or phone already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = await Teacher.create({
            name: name,
            email: email,
            phone: phone,
            batch: batch,
            password: hashedPassword
        });

        return {
            id: newTeacher.id,
            name: newTeacher.name,
            email: newTeacher.email,
            phone: newTeacher.phone,
            batch: newTeacher.batch
        };
    }catch(err){
        console.error("Error creating teacher:", err);
        throw new Error("Failed to create teacher");
    }
}

const createStudent = async (name, email, phone, batch, studentId, password) => {
    try{
        const existingStudent = await Student.findOne({
            where: {
                [Op.or]: [
                    {email: email},
                    {phone: phone},
                    {studentId: studentId}
                ]
            }
        });

        if(existingStudent) {
            throw new Error("Student with this email, phone or student ID already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await Student.create({
            name: name,
            email: email,
            phone: phone,
            batch: batch,
            studentId: studentId,
            password: hashedPassword
        });

        return {
            id: newStudent.id,
            name: newStudent.name,
            email: newStudent.email,
            phone: newStudent.phone,
            batch: newStudent.batch
        };
    }catch(err){
        console.error("Error creating student:", err);
        throw new Error("Failed to create student");
    }
}

const allStudents = async () => {
    try{
        const students = await Student.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'batch', 'studentId', 'marks', 'codeforce_handle', 'codechef_handle', 'atcoder_handle', 'vjudge_handle']
        });
        return students;
    }catch(err){
        console.error("Error fetching students:", err);
        throw new Error("Failed to fetch students");
    }
}

const changePasswordStudent = async (studentId, newPassword) => {
    try{
        const student = await Student.findByPk(studentId);
        if(!student) {
            throw new Error("Student not found");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;
        await student.save();

        return {
            id: student.id,
            name: student.name,
            email: student.email
        };
    }catch(err){
        console.error("Error changing password:", err);
        throw new Error("Failed to change password");
    }
}

const editStudent = async (id, studentId, name, email, phone, batch) => {
    try{
        const student = await Student.findByPk(id);
        if(!student) {
            throw new Error("Student not found");
        }

        student.name = name;
        student.email = email;
        student.phone = phone;
        student.batch = batch;
        student.studentId = studentId;

        await student.save();

        return {
            id: student.id,
            name: student.name,
            email: student.email,
            phone: student.phone,
            batch: student.batch,
            studentId: student.studentId
        };
    }catch(err){
        console.error("Error editing student:", err);
        throw new Error("Failed to edit student");
    }
}

const singleStudentById = async (id) => {
    try{
        const student = await Student.findByPk(id, {
            attributes: ['id', 'name', 'email', 'phone', 'batch', 'studentId', 'marks', 'codeforce_handle', 'codechef_handle', 'atcoder_handle', 'vjudge_handle']
        });
        if(!student) {
            throw new Error("Student not found");
        }
        return student;
    }catch(err){
        console.error("Error fetching student by ID:", err);
        throw new Error("Failed to fetch student by ID");
    }
}

const removeStudent = async (id) => {
    try{
        const student = await Student.findByPk(id);
        if(!student) {
            throw new Error("Student not found");
        }
        await student.destroy();
        return { message: "Student deleted successfully" };
    }catch(err){
        console.error("Error deleting student:", err);
        throw new Error("Failed to delete student");
    }
}

const allTeachers = async () => {
    try{
        const teachers = await Teacher.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'batch']
        });
        return teachers;
    }catch(err){
        console.error("Error fetching teachers:", err);
        throw new Error("Failed to fetch teachers");
    }
}
const removeTeacher = async (id) => {
    try{
        const teacher = await Teacher.findByPk(id);
        if(!teacher) {
            throw new Error("Teacher not found");
        }
        await teacher.destroy();
        return { message: "Teacher deleted successfully" };
    }catch(err){
        console.error("Error deleting teacher:", err);
        throw new Error("Failed to delete teacher");
    }
}

const editTeacher = async (id, name, email, batch) => {
    try{
        const teacher = await Teacher.findByPk(id);
        if(!teacher) {
            throw new Error("Teacher not found");
        }

        teacher.name = name;
        teacher.email = email;
        teacher.batch = batch;

        await teacher.save();

        return {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            batch: teacher.batch
        };
    }catch(err){
        console.error("Error editing teacher:", err);
        throw new Error("Failed to edit teacher");
    }
}

const changePasswordTeacher = async (id, newPassword) => {
    try{
        const teacher = await Teacher.findByPk(id);
        if(!teacher) {
            throw new Error("Teacher not found");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        teacher.password = hashedPassword;
        await teacher.save();

        return {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email
        };
    }catch(err){
        console.error("Error changing password:", err);
        throw new Error("Failed to change password");
    }
}

const singleTeacherById = async (id) => {
    try{
        const teacher = await Teacher.findByPk(id, {
            attributes: ['id', 'name', 'email', 'phone', 'batch']
        });
        if(!teacher) {
            throw new Error("Teacher not found");
        }
        return teacher;
    }catch(err){
        console.error("Error fetching teacher by ID:", err);
        throw new Error("Failed to fetch teacher by ID");
    }
}

const changeAdminPassword = async (id, oldPassword, newPassword) => {
    try{
        const admin = await Admin.findByPk(id);
        if(!admin) {
            throw new Error("Admin not found");
        }

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if(!isMatch) {
            throw new Error("Old password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        return {
            id: admin.id,
            email: admin.email,
            phone: admin.phone
        };
    }catch(err){
        console.error("Error changing password:", err);
        throw new Error(err.error);
    }
}

const addIupc = async (name, description, contestDate, registrationDeadline, registrationLink) => {
    try {
        const newIupc = await Iupc.create({
            name: name,
            description: description,
            contestDate: contestDate,
            registrationDeadline: registrationDeadline,
            registrationLink: registrationLink
        });
        return newIupc;
    } catch (err) {
        console.error("Error adding IUPC:", err);
        throw new Error("Failed to add IUPC");
    }
}

const allIupc = async () => {
    try {
        const iupcs = await Iupc.findAll({
            attributes: ['id', 'name', 'description', 'contestDate', 'registrationDeadline', 'registrationLink', 'totalTeams', 'gubRank', 'teamInfo', 'status']
        });
        return iupcs;
    } catch (err) {
        console.error("Error fetching IUPCs:", err);
        throw new Error("Failed to fetch IUPCs");
    }
}

const changeIupcStatus = async (id, status) => {
    try {
        const iupc = await Iupc.findByPk(id);
        if (!iupc) {
            throw new Error("IUPC not found");
        }
        iupc.status = status;
        await iupc.save();
        return iupc;
    } catch (err) {
        console.error("Error changing IUPC status:", err);
        throw new Error("Failed to change IUPC status");
    }
}

const addTeamsToIupc = async (name, member1, member2, member3, coach, rank, solved, iupcId) => {
    try {
        const team = await Team.create({
            name,
            member1,
            member2,
            member3,
            coach,
            rank,
            solved,
            iupcId
        });
        return team;
    } catch (err) {
        console.error("Error adding teams to IUPC:", err);
        throw new Error("Failed to add teams to IUPC");
    }
}

const editIUPC = async (id, name, description, contestDate, registrationDeadline, registrationLink, totalTeams, gubRank) => {
    try {
        const iupc = await Iupc.findByPk(id);
        if (!iupc) {
            throw new Error("IUPC not found");
        }
        iupc.name = name;
        iupc.description = description;
        iupc.contestDate = contestDate;
        iupc.registrationDeadline = registrationDeadline;
        iupc.registrationLink = registrationLink;
        iupc.totalTeams = totalTeams;
        iupc.gubRank = gubRank;
        await iupc.save();
        return iupc;
    } catch (err) {
        console.error("Error editing IUPC:", err);
        throw new Error("Failed to edit IUPC");
    }
}

const deleteIUPC = async (id) => {
    try {
        const iupc = await Iupc.findByPk(id);
        if (!iupc) {
            throw new Error("IUPC not found");
        }
        await iupc.destroy();
        return { message: "IUPC deleted successfully" };
    } catch (err) {
        console.error("Error deleting IUPC:", err);
        throw new Error("Failed to delete IUPC");
    }
}

const teamsByIupcId = async (iupcId) => {
    try {
        const teams = await Team.findAll({
            where: { iupcId: iupcId },
            attributes: ['id', 'name', 'member1', 'member2', 'member3', 'coach', 'rank', 'solved']
        });
        return teams;
    } catch (err) {
        console.error("Error fetching teams by IUPC ID:", err);
        throw new Error("Failed to fetch teams by IUPC ID");
    }
}

const allTempStudents = async () => {
    try{
        const tempStudents = await TempStudent.findAll();

        return tempStudents;
    } catch (err) {
        console.error("Error fetching temporary students:", err);
        throw new Error("Failed to fetch temporary students");
    }
}

const approveStudent = async(id) => {
    try{
        const tempStudent = await TempStudent.findByPk(id);
        if(!tempStudent) {
            throw new Error("Temporary student not found");
        }

        const newStudent = await createStudent(
            tempStudent.name,
            tempStudent.email,
            tempStudent.phone,
            tempStudent.batch,
            tempStudent.studentId,
            tempStudent.password
        );
        await tempStudent.destroy();
        return newStudent;
    } catch (err) {
        console.error("Error approving student:", err);
        throw new Error("Failed to approve student");
    }
}

const rejectTempStudent = async(id) => {
    try{
        const tempStudent = await TempStudent.findByPk(id);
        if(!tempStudent) {
            throw new Error("Temporary student not found");
        }
        await tempStudent.destroy();
        return { message: "Temporary student rejected successfully" };
    } catch (err) {
        console.error("Error rejecting temporary student:", err);
        throw new Error("Failed to reject temporary student");
    }
}

const deleteIupcTeam = async (id) => {
    try {
        const team = await Team.findByPk(id);
        if (!team) {
            throw new Error("Team not found");
        }
        await team.destroy();
        return { message: "Team deleted successfully" };
    } catch (err) {
        console.error("Error deleting IUPC team:", err);
        throw new Error("Failed to delete IUPC team");
    }
}

const editIupcTeam = async (id, name, member1, member2, member3, coach, rank, solved) => {
    try {
        const team = await Team.findByPk(id);
        if (!team) {
            throw new Error("Team not found");
        }
        team.name = name;
        team.member1 = member1;
        team.member2 = member2;
        team.member3 = member3;
        team.coach = coach;
        team.rank = rank;
        team.solved = solved;
        await team.save();
        return team;
    } catch (err) {
        console.error("Error editing IUPC team:", err);
        throw new Error("Failed to edit IUPC team");
    }
}

const addEvent = async(title, date, type, status, bgImageLink) => {
    try{
        if(!bgImageLink) bgImageLink = null;
        const newEvent = await Event.create({
            title: title,
            date: date,
            type: type,
            status: status,
            bgImageLink: bgImageLink
        });
        return newEvent;
    }catch(err) {
        console.error("Error adding event:", err);
        throw new Error("Failed to add event");
    }
}

const changeEventStatus = async(id, status, bgImageLink) => {
    try{
        const event = await Event.findByPk(id);
        if(!event) {
            throw new Error("Event not found");
        }
        event.status = status;
        event.bgImageLink = bgImageLink || null;
        await event.save();
        return event;
    }catch(err) {
        console.error("Error changing event status:", err);
        throw new Error("Failed to change event status");
    }
}

const editEvent = async(id, title, date, type, status, bgImageLink) => {
    try{
        const event = await Event.findByPk(id);
        if(!event) {
            throw new Error("Event not found");
        }
        event.title = title;
        event.date = date;
        event.type = type;
        event.status = status;
        event.bgImageLink = bgImageLink || null;
        await event.save();
        return event;
    }catch(err) {
        console.error("Error editing event:", err);
        throw new Error("Failed to edit event");
    }
}

const deleteEvent = async(id) => {
    try{
        const event = await Event.findByPk(id);
        if(!event) {
            throw new Error("Event not found");
        }
        await event.destroy();
        return { message: "Event deleted successfully" };
    }catch(err) {
        console.error("Error deleting event:", err);
        throw new Error("Failed to delete event");
    }
}

const allEvents = async () => {
    try{
        const events = await Event.findAll({
            attributes: ['id', 'title', 'date', 'type', 'status', 'bgImageLink'],
            order: [['date', 'DESC']]
        });
        return events;
    }catch(err) {
        console.error("Error fetching events:", err);
        throw new Error("Failed to fetch events");
    }
}

module.exports = {
  createAdmin,
  login,
  createTeacher,
  createStudent,
  allStudents,
  changePasswordStudent,
  editStudent,
  changePasswordTeacher,
  removeStudent,
  singleStudentById,
  allTeachers,
  removeTeacher,
  editTeacher,
  singleTeacherById,
  changeAdminPassword,
  addIupc,
  allIupc,
  changeIupcStatus,
  addTeamsToIupc,
  editIUPC,
  deleteIUPC,
  teamsByIupcId,
  allTempStudents,
  approveStudent,
  rejectTempStudent,
  deleteIupcTeam,
  editIupcTeam,
  addEvent,
  changeEventStatus,
  editEvent,
  allEvents,
  deleteEvent
};