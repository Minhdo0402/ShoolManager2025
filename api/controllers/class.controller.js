const Class = require("../models/class.model");
const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");

module.exports = {
  getAllClasses: async (req, res) => {
    try {
        const schoolId = req.user.schoolId;
        const allClasses = await Class.find({school:schoolId});
        res.status(200).json({success:true, message:"Success in fetching all Classes.", data:allClasses})
    } catch (error) {
        console.log("GetAllClasses error", error)
      res
        .status(500)
        .json({ success: false, message: "Server Error in Getting Class." });
    }
  },
  getSingleClass: async (req,res) => {
    try {
      const schoolId = req.user.schoolId;
      const classId = req.params.id
      const allClasses = await Class.findOne({school:schoolId, _id:classId}).populate("attendee");
      res.status(200).json({success:true, message:"Success in fetching Single Class.", data:allClasses})
  } catch (error) {
      console.log("GetAllClasses error", error)
    res
      .status(500)
      .json({ success: false, message: "Server Error in Getting Single Class." });
  }
  },
  getAttendeeClass: async (req,res) => {
    console.log("called")
    try {
      const schoolId = req.user.schoolId;
      const attendeeId = req.user.id
      const classes = await Class.find({school:schoolId, attendee:attendeeId});
      res.status(200).json({success:true, message:"Success in fetching Attendee Class.", data:classes})
  } catch (error) {
      console.log("GetAttendeeClasses error", error)
    res
      .status(500)
      .json({ success: false, message: "Server Error in Getting Attendee Class." });
  }
  },
  createClass: async (req, res) => {
    try {
      const newClass = new Class({
        school: req.user.schoolId,
        class_text: req.body.class_text,
        class_num: req.body.class_num,
      });
      await newClass.save();
      res
        .status(200)
        .json({ success: true, message: "Successfully created the Class." });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Server Error in Creating Class." });
    }
  },
  updateClassWithId: async (req, res) => {
    try {
      let id = req.params.id;
      await Class.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const classAfterUpdate = await Class.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Class Updated.",
        data: classAfterUpdate,
      });
    } catch (error) {
      console.log("Update class Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Creating Class." });
    }
  },
  deleteClassWithId: async (req, res) => {
    try {
      let id = req.params.id;
      let schoolId = req.user.schoolId;
      const classStudentCount = (
        await Student.find({ student_class: id, school: schoolId })
      ).length;
      const classExamCount = (await Exam.find({ class: id, school: schoolId }))
        .length;
      const classScheduleCount = (
        await Schedule.find({ class: id, school: schoolId })
      ).length;

      if (
        classStudentCount === 0 &&
        classExamCount === 0 &&
        classScheduleCount === 0
      ) {
        await Class.findOneAndDelete({ _id: id, school: schoolId });
        res
          .status(200)
          .json({ success: true, message: "Class Deleted Successfully." });
      } else {
        res
          .status(500)
          .json({ success: false, message: "This Class is already in use." });
      }
    } catch (error) {
      console.log("Delete class Error=>", error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in Deleting Class." });
    }
  },
};
