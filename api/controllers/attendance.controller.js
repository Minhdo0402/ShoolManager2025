const Attendance = require("../models/attendance.model");
const moment = require("moment");

module.exports = {
  markAttendance: async (req, res) => {
    try {
      const { studentId, date, status, classId } = req.body;
      const schoolId = req.user.schoolId;

      const newAttendance = new Attendance({
        student: studentId,
        date,
        status,
        class: classId,
        school: schoolId,
      });
      await newAttendance.save();
      res.status(201).json(newAttendance);
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: "Error in marking attendance." });
    }
  },

 
  getAttendance: async (req, res) => {
    try {
      const { studentId } = req.params;
      const attendance = await Attendance.find({ student: studentId }).populate(
        "student"
      );
      res.status(200).json(attendance);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in getting attendance." });
    }
  },
  checkAttendance: async (req, res) => {
    console.log("Called Check")
    //const { classId } = req.params;
    const today = moment().startOf("day");
    try {
      const attendanceForToday = await Attendance.findOne({
        class: req.params.classId,
        date: {
          //00:00 hrs to 23:59
          $gte: today.toDate(),
          $lt: moment(today).endOf("day").toDate(),
        },
      });

      if (attendanceForToday) {
        return res.status(200).json({
          attendanceTaken: true,
          message: "Attendance already token.",
        });
      } else {
        return res.status(200).json({
          attendanceTaken: false,
          message: "No attendance taken yet for today.",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error in checking attendance." });
    }
  },

  
};
