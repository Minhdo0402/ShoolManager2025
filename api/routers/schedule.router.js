const express = require("express");
const authMiddleware = require("../auth/auth");
const { createSchedule, getScheduleWithClass, updateScheduleWithId, deleteScheduleWithId, getScheduleWithId } = require("../controllers/schedule.controller");


const router = express.Router();

router.post("/create", authMiddleware(["SCHOOL"]), createSchedule);
router.get("/fetch-with-class/:id", authMiddleware(["SCHOOL","TEACHER","STUDENT"]), getScheduleWithClass);
router.post("/update/:id", authMiddleware(["SCHOOL"]), updateScheduleWithId); // AUTHENTICATION USER FOR UPDATE
router.get("/fetch/:id", authMiddleware(["SCHOOL"]), getScheduleWithId);
router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteScheduleWithId);

module.exports = router;