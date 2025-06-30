const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/admin", require("./routes/AdminRoutes"));
app.use("/teacher", require("./routes/TeacherRoutes"));
app.use("/student", require("./routes/StudentRoutes"));
app.use("/mail", require("./routes/mailRoutes"));

sequelize
    .sync({alter: false})
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
        process.exit(1);
    })