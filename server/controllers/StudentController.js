const { put } = require("../routes/StudentRoutes");
const { allUpcomingIupc, allPastIupc, teamsByIupc, login, singleStudent, editBasicInfo, editOnlineJudges, marksForStudent, classForStudent, contestForStudent, leaderboardForStudent, attendanceForStudent, isStudentIdValid, requestToRegister, changePassword, updateProfilePicture } = require("../services/StudentServices");
const jsonwebtoken = require("jsonwebtoken");
const axios = require("axios");
const FormData = require("form-data");

const getAllUpcomingIupc = async (req, res) => {
    try{
        const iupc = await allUpcomingIupc();
        res.status(200).json({
            message: "All upcoming IUPC fetched successfully",
            data: iupc
        })
    }catch(err){
        console.error("Error fetching upcoming IUPC:", err);
        res.status(500).json({
            message: "Failed to fetch upcoming IUPC",
            error: err.message
        });
    }
}

const getAllPastIupc = async (req, res) => {
    try{
        const iupc = await allPastIupc();

        const sortedIupcs = iupc.sort((a, b) => {
          const dateA = new Date(a.contestDate);
          const dateB = new Date(b.contestDate);
          return dateB - dateA;
        });
        res.status(200).json({
            message: "All past IUPC fetched successfully",
            data: sortedIupcs
        })
    }catch(err){
        console.error("Error fetching past IUPC:", err);
        res.status(500).json({
            message: "Failed to fetch past IUPC",
            error: err.message
        });
    }
}

const getTeamsByIupc = async (req, res) => {
    const { iupcId } = req.params;
    try{
        const teams = await teamsByIupc(iupcId);
        res.status(200).json({
            message: "Teams for IUPC fetched successfully",
            data: teams
        })
    }catch(err){
        console.error("Error fetching teams for IUPC:", err);
        res.status(500).json({
            message: "Failed to fetch teams for IUPC",
            error: err.message
        });
    }
}

const loginStudent = async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const user = await login(studentId, password);
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    // Handling different errors
    if (err.message === "Invalid Student Id") {
      return res.status(401).json({
        message: "Login failed",
        error: "Student ID does not exist",
      });
    } else if (err.message === "Incorrect password") {
      return res.status(401).json({
        message: "Login failed",
        error: "Incorrect password",
      });
    } else {
      return res.status(401).json({
        message: "Login failed",
        error: "An unexpected error occurred",
      });
    }
  }
};

const getSingleStudent = async(req, res) => {
    const { studentId } = req.params;
    try{
        const student = await singleStudent(studentId);
        res.status(200).json({
            message: "Student fetched successfully",
            data: student
        });
    }catch(err){
        console.error("Error fetching student:", err);
        res.status(500).json({
            message: "Failed to fetch student",
            error: err.message
        });
    }
}

const putBasicInfo = async (req, res) => {
    const { studentId } = req.params;
    const { name, phone, profilePicture } = req.body;
    console.log("Received data:", { studentId, name, phone, profilePicture });
    try {
        const student = await editBasicInfo(studentId, name, phone, profilePicture);
        res.status(200).json({
            message: "Basic info updated successfully",
            data: student
        });
    } catch (err) {
        console.error("Error updating basic info:", err);
        res.status(500).json({
            message: "Failed to update basic info",
            error: err.message
        });
    }
}

const putOnlineJudges = async (req, res) => {
    const { studentId } = req.params;
    const { codeforces, atcoder, vjudge, greenoj } = req.body;
    try {
        const student = await editOnlineJudges(studentId, codeforces, atcoder, vjudge, greenoj);
        res.status(200).json({
            message: "Online judges updated successfully",
            data: student
        });
    } catch (err) {
        console.error("Error updating online judges:", err);
        res.status(500).json({
            message: "Failed to update online judges",
            error: err.message
        });
    }
}

const getMarksForStudent = async(req, res) => {
    const { studentId } = req.params;
    try {
        const marks = await marksForStudent(studentId);
        res.status(200).json({
            message: "Marks fetched successfully",
            data: marks
        });
    } catch (err) {
        console.error("Error fetching marks:", err);
        res.status(500).json({
            message: "Failed to fetch marks",
            error: err.message
        });
    }
}

const getClassForStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const classes = await classForStudent(studentId);

        res.status(200).json({
            message: "Class fetched successfully",
            data: classes
        });
    } catch (err) {
        console.error("Error fetching class:", err);
        res.status(500).json({
            message: "Failed to fetch class",
            error: err.message,
        });
    }
}

const getContestForStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const contests = await contestForStudent(studentId);

        res.status(200).json({
            message: "Contests fetched successfully",
            data: contests
        });
    } catch (err) {
        console.error("Error fetching contests:", err);
        res.status(500).json({
            message: "Failed to fetch contests",
            error: err.message,
        });
    }
}

const getLeaderboard = async (req, res) => {
    const { studentId } = req.params;
    try {
        const marks = await leaderboardForStudent(studentId);
        res.status(200).json({
            marks
        });
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({
            message: "Failed to fetch leaderboard",
            error: err.message
        });
    }
}

const getAttendanceForStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const attendance = await attendanceForStudent(studentId);
        res.status(200).json({
            message: "Attendance fetched successfully",
            data: attendance
        });
    } catch (err) {
        console.error("Error fetching attendance:", err);
        res.status(500).json({
            message: "Failed to fetch attendance",
            error: err.message
        });
    }
}

const putProfilePicture = async (req, res) => {
    const { studentId } = req.params;
    const { profilePictureUrl } = req.body;

    try {
        const student = await updateProfilePicture(
          studentId,
          profilePictureUrl
        );
        res.status(200).json({
            message: "Profile picture updated successfully",
            data: student
        });
    } catch (err) {
        console.error("Error updating profile picture:", err);
        res.status(500).json({
            message: "Failed to update profile picture",
            error: err.message
        });
    }
}


const studentVerification = async (req, res) => {
  const { studentId } = req.params;
  const { token } = req.body;

  try {
    const isValid = await isStudentIdValid(token, studentId);

    if (isValid) {
      return res.status(200).json({ message: "Student ID is valid" });
    } else {
      return res.status(401).json({
        message: "Unauthorized",
        error: "Token expired or invalid",
      });
    }
  } catch (err) {
    console.error("Error during student verification:", err);
    return res.status(500).json({
      message: "Failed to verify student",
      error: err.message,
    });
  }
};
  

const registrationRequest = async (req, res) => {
  const { name, studentId, email, phone, batch, password, currentAddress, idCardUrl } =
    req.body;

  try {
    const request = await requestToRegister(
      name,
      studentId,
      email,
      phone,
      batch,
      password,
      currentAddress,
      idCardUrl
    );
    res.status(201).json({
      message: "Registration request created successfully",
      data: request,
    });
  } catch (err) {
    console.error("Error creating registration request:", err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};


const uploadImageToImgbb = async (req, res) => {
  const { imageBase64 } = req.body;

  const apiKey = "edc5b57f7a5277b6741fa3dc989a874e";
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  try {
    // Prepare form data
    const formData = new FormData();
    formData.append("image", imageBase64);

    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      data: response.data,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({
      message: "Failed to upload image",
      error: err.message,
    });
  }
};

const putPassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    const { studentId } = req.params;

    try{
        const student = await changePassword(studentId, oldPassword, newPassword);
        res.status(200).json({
            message: "Password updated successfully",
            data: student
        });

    }catch(err) {
        console.error("Error updating password:", err);
        res.status(500).json({
            message: "Failed to update password",
            error: err.message
        });
    }
}


module.exports = {
  getAllUpcomingIupc,
  getAllPastIupc,
  getTeamsByIupc,
  loginStudent,
  getSingleStudent,
  putBasicInfo,
  putOnlineJudges,
  getMarksForStudent,
  getClassForStudent,
  getContestForStudent,
  getLeaderboard,
  getAttendanceForStudent,
  studentVerification,
  registrationRequest,
  uploadImageToImgbb,
  putPassword,
  putProfilePicture,
};