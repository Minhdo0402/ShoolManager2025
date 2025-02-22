const Subject = require("../models/subject.model");
const Student = require("../models/student.model");
const Exam = require("../models/examination.model");
const Schedule = require("../models/schedule.model");

module.exports = {
  getScheduleWithClass: async (req, res) => {
    console.log(req.params.id)
    try {
      const classId = req.params.id;
      const schoolId = req.user.schoolId;
      const schedules = await Schedule.find({
        school: schoolId,
        class: classId,
      }).populate(['teacher','subject']);
      res.status(200).json({
        success: true,
        message: "Success in fetching all Subjects.",
        data: schedules,
      });
    } catch (error) {
      console.log("Get Schedule With Class error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Schedule with Class.",
      });
    }
  },
  createSchedule: async (req, res) => {
    try {
      const newSchedule = new Schedule({
        school: req.user.schoolId,
        teacher: req.body.teacher,
        subject: req.body.subject,
        class: req.body.selectedClass,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      });
      await newSchedule.save();
      res
        .status(200)
        .json({ success: true, message: "Successfully created the Schedule." });
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({
          success: false,
          message: "Server Error in Creating Schedule.",
        });
    }
  },
  getScheduleWithId: async (req, res) => {
    console.log(req.params.id)
    try {
      const id = req.params.id;
      const schoolId = req.user.schoolId;
      const schedule = (await Schedule.find({
        school: schoolId,
        _id: id,
      }))[0];
      res.status(200).json({
        success: true,
        message: "Success in fetching all Subjects.",
        data: schedule,
      });
    } catch (error) {
      console.log("Get Schedule With Class error", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Getting Schedule with Class.",
      });
    }
  },
  updateScheduleWithId: async (req, res) => {
    try {
      let id = req.params.id;
      await Schedule.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      const scheduleAfterUpdate = await Schedule.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Schedule Updated.",
        data: scheduleAfterUpdate,
      });
    } catch (error) {
      console.log("Update Schedule Error=>", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Server Error in Creating Schedule.",
        });
    }
  },
  deleteScheduleWithId: async (req, res) => {
    try {
      let id = req.params.id;
      let schoolId = req.user.schoolId;
  
      await Schedule.findOneAndDelete({ _id: id, school: schoolId });
      res.status(200).json({
        success: true,
        message: "Schedule Deleted Successfully.", // Đảm bảo thông báo xóa đúng
      });
    } catch (error) {
      console.log("Delete Schedule Error=>", error);
      res.status(500).json({
        success: false,
        message: "Server Error in Deleting Schedule.",
      });
    }
  }
};
