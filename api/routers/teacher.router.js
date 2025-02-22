const express = require("express");
const authMiddleware = require('../auth/auth')
const {
  registerTeacher,
  loginTeacher,
  updateTeacher,
  getTeacherOwnData,
  getTeachersWithQuery,
  getTeacherWithId,
  deleteTeacherWithId,
} = require("../controllers/teacher.controller");

const router = express.Router();

router.post("/register",authMiddleware(['SCHOOL']), registerTeacher);
router.get("/fetch-with-query",authMiddleware(['SCHOOL']), getTeachersWithQuery);
router.post("/login", loginTeacher);
router.patch("/update/:id",authMiddleware(['SCHOOL']), updateTeacher);    // AUTHENTICATION USER FOR UPDATE
router.get("/fetch-single",authMiddleware(['TEACHER']), getTeacherOwnData);
router.get("/fetch/:id",authMiddleware(['SCHOOL']), getTeacherWithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']), deleteTeacherWithId);

module.exports = router;
