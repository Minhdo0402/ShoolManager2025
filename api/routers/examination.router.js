const express = require("express");
const authMiddleware = require("../auth/auth");
const { newExamination, getAllExaminations, getExaminationsByClass, updateExaminationWithId, deleteExaminationWithId } = require("../controllers/examination.controller");


const router = express.Router();

router.post("/create", authMiddleware(["SCHOOL"]), newExamination);
router.get("/all", authMiddleware(["SCHOOL"]), getAllExaminations);
router.get("/class/:id", authMiddleware(["SCHOOL","STUDENT","TEACHER"]), getExaminationsByClass);
router.post("/update/:id", authMiddleware(["SCHOOL"]), updateExaminationWithId); // AUTHENTICATION USER FOR UPDATE
router.delete("/delete/:id", authMiddleware(["SCHOOL"]), deleteExaminationWithId);

module.exports = router;
