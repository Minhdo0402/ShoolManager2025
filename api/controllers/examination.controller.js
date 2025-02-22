const Examination = require("../models/examination.model");

module.exports = {
  newExamination: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const { date, subjectId, examType, classId } = req.body;
      const newExamination = new Examination({
        school: schoolId,
        examDate: date,
        subject: subjectId,
        examType: examType,
        class: classId,
      });
      const savedData = await newExamination.save();
      res.status(200).json({
        success: true,
        message: "Success in creating new Examinations.",
        data: savedData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Creating New Examinations.",
      });
    }
  },
  getAllExaminations: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const examinations = await Examination.find({ school: schoolId });
      res.status(200).json({ success: true, examinations });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in Fetching Examinations." });
    }
  },
  getExaminationsByClass: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const classId = req.params.id;
      const examinations = await Examination.find({
        class: classId,
        school: schoolId,
      }).populate("subject");
      res.status(200).json({ success: true, examinations });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in Fetching Examinations." });
    }
  },
  updateExaminationWithId: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const examinationId = req.params.id;
      const { date, subjectId, examType } = req.body;
  
      const updatedExam = await Examination.findOneAndUpdate(
        { _id: examinationId, school: schoolId },  // Sửa lỗi điều kiện tìm kiếm
        {
          $set: {
            examDate: date,
            subject: subjectId,
            examType: examType,
          },
        },
        { new: true }  // Trả về bản ghi mới sau khi cập nhật
      );
  
      if (!updatedExam) {
        return res.status(404).json({
          success: false,
          message: "Examination not found or unauthorized.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Examination is updated successfully.",
        data: updatedExam,
      });
    } catch (error) {
      console.error("Error updating examination:", error);
      res.status(500).json({
        success: false,
        message: "Error in updating examination.",
      });
    }
  },
  
  deleteExaminationWithId: async (req, res) => {
    try {
      const schoolId = req.user.schoolId;
      const examinationId = req.params.id;
      await Examination.findOneAndDelete({
        _id: examinationId,
        school: schoolId,
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Examination is deleted Successfully.",
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in Deleting Examinations." });
    }
  },
};
