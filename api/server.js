const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//ROUTERS IMPORT
const schoolRouter = require("./routers/school.router")
const classRouter = require("./routers/class.router")
const subjectRouter = require("./routers/subject.router")
const studentRouter = require("./routers/student.router")
const teacherRouter = require("./routers/teacher.router")
const scheduleRouter = require("./routers/schedule.router")
const attendanceRouter = require("./routers/attendance.router")
const examinationRouter = require("./routers/examination.router")
const noticeRouter = require("./routers/notice.router")

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOption = {exposedHeaders:"Authorization"}
app.use(cors(corsOption));
app.use(cookieParser())

//MONGODB CONNECTION
mongoose.connect(`mongodb+srv://do243960:minhdo123456@cluster0.mopkt.mongodb.net/schoolManagement`).then(db=>{
    console.log("MongoDB is connected Successfully")
}).catch(e=>{
    console.log("MongoDb Error",e)
})

// ROUTERS
app.use("/api/school", schoolRouter)
app.use("/api/class", classRouter)
app.use("/api/subject", subjectRouter)
app.use("/api/student", studentRouter)
app.use("/api/teacher", teacherRouter)
app.use("/api/schedule", scheduleRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/examination", examinationRouter)
app.use("/api/notice", noticeRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running at PORT =>", PORT);
});
