import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../../../environment";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function AttendanceTeacher() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const [attendanceStatus, setAttendanceStatus] = useState({});

  const handleAttendance = (studentId, status) => {
    setAttendanceStatus((prevStatus) => {
      const newStatus = { ...prevStatus, [studentId]: status };
      console.log("Updated Attendance:", newStatus);
      return newStatus;
    });
  };

  const singleAttendance = async (studentId, status) => {
    try {
      const response = await axios.post(`${baseApi}/attendance/mark`, {
        studentId,
        date: new Date(),
        classId: selectedClass,
        status,
      });
      console.log("Marking Attendance", response);
    } catch (error) {
      console.log("Error => marking Attendee.", error);
    }
  };

  const submitAttendance = async () => {
    console.log("Final Attendance Status Before Submit:", attendanceStatus); // 🛠 Debug

    try {
      await Promise.all(
        students.map((student) =>
          singleAttendance(
            student._id,
            attendanceStatus[student._id] || "present"
          )
        )
      );
      setMessage("Attendance Submitted Successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed Attendance Submission");
      setMessageType("error");
      console.log("Error => All Submit Error[marking Attendee].", error);
    }
  };

  const fetchAttendeeClass = async () => {
    try {
      const response = await axios.get(`${baseApi}/class/attendee`);
      console.log("attendee class", response);
      setClasses(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedClass(response.data.data[0]._id);
      }
    } catch (error) {
      console.log("Error => fetching Attendee class.", error);
    }
  };

  useEffect(() => {
    fetchAttendeeClass();
  }, []);

  const [attendanceChecked, setAttendanceChecked] = useState(false);
  const [students, setStudents] = useState([]);

  const checkAttendanceAndFetchStudents = async () => {
    try {
      if (selectedClass) {
        const responseStudent = await axios.get(
          `${baseApi}/student/fetch-with-query`,
          {
            params: { student_class: selectedClass },
          }
        );
        const responseCheck = await axios.get(
          `${baseApi}/attendance/check/${selectedClass}`
        );
        console.log("Check", responseCheck);

        if (!responseCheck.data.attendanceTaken) {
          setStudents(responseStudent.data.students);
          responseStudent.data.students.forEach((student) => {
            handleAttendance(student._id, "present");
          });
        } else {
          setAttendanceChecked(true);
        }
      }
    } catch (error) {
      console.log("Error in check attendance:", error);
    }
  };

  useEffect(() => {
    checkAttendanceAndFetchStudents();
  }, [selectedClass, message]);
  return (
    <>
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}
      <h1>Attendance Teacher</h1>
      {classes.length > 0 ? (
        <Paper sx={{ marginBottom: "20px" }}>
          <Box>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              You are attendee of {classes.length} classes.
            </Alert>
            <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                label="subject"
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setAttendanceChecked(false);
                }}
                value={selectedClass}
              >
                <MenuItem value="">Select Class</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.class_text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>
      ) : (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          You are not attendee of any classes.
        </Alert>
      )}
      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
                      <InputLabel>Attandance</InputLabel>
                      <Select
                        labelId="Attendance"
                        onChange={(e) => {
                          handleAttendance(student._id, e.target.value);
                        }}
                        value={attendanceStatus[student._id] || "present"}
                      >
                        <MenuItem value={"present"}>Present</MenuItem>
                        <MenuItem value={"absent"}>Absent</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" onClick={submitAttendance}>
            Take Attendance
          </Button>
        </TableContainer>
      ) : (
        <>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            {attendanceChecked
              ? "Attendance Already taken for this class."
              : "There is no student in this class."}
          </Alert>
        </>
      )}
    </>
  );
}
