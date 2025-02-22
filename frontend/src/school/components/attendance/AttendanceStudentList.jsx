import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

//import { useFormik } from "formik";
import {
  // Button,
  // Card,
  // CardActionArea,
  // CardContent,
  // CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  //MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { baseApi } from "../../../environment";
import Attendee from "./Attendee";
import { Link } from "react-router-dom";
// import {
//   studentEditSchema,
//   studentSchema,
// } from "../../../yupSchema/studentSchema";

//ICONS
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function AttendanceStudentList() {
  // const [edit, setEdit] = React.useState(false);
  // const [editId, setEditId] = React.useState(null);
  const [classes, setClasses] = React.useState([]);

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const handleMessage = (message, type) => {
    setMessageType(type);
    setMessage(message);
  };

  const fetchClasses = () => {
    axios
      .get(`${baseApi}/class/all`)
      .then((resp) => {
        setClasses(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching class.", e);
      });
  };

  const [params, setParams] = React.useState({});
  const [selectedClass, setSelectedClass] = React.useState(null);
  const handleClass = (e) => {
    setSelectedClass(e.target.value);
    setParams((prevParams) => ({
      ...prevParams,
      student_class: e.target.value || undefined,
    }));
  };

  const handleSearch = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: e.target.value || undefined,
    }));
  };

  const [students, setStudents] = React.useState([]);
  const fetchStudents = () => {
    axios
      .get(`${baseApi}/student/fetch-with-query`, { params })
      .then((resp) => {
        setStudents(resp.data.students);
        fetchAttendanceForStudents(resp.data.students);
        console.log("response students", resp);
      })
      .catch((e) => {
        console.log("Error in fetching class.", e);
      });
  };

  const [attendanceData, setAttendanceData] = React.useState({});
  const fetchAttendanceForStudents = async (studentList) => {
    const attendancePromises = studentList.map((student) =>
      fetchAttendanceForStudent(student._id)
    );
    const results = await Promise.all(attendancePromises);
    const updatedAttendanceData = {};
    results.forEach(({ studentId, attendancePercentage }) => {
      updatedAttendanceData[studentId] = attendancePercentage;
    });
    setAttendanceData(updatedAttendanceData);
  };

  const fetchAttendanceForStudent = async (studentId) => {
    try {
      const response = await axios.get(`${baseApi}/attendance/${studentId}`);
      const attendanceRecords = response.data;
      const totalClasses = attendanceRecords.length;
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length;
      const attendancePercentage =
        totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;
      return { studentId, attendancePercentage };
    } catch (error) {
      console.error(
        `Error fetching attendance for student ${studentId}:`,
        error
      );
      return { studentId, attendancePercentage: 0 };
    }
  };

  React.useEffect(() => {
    fetchClasses();
  }, []);

  React.useEffect(() => {
    fetchStudents();
  }, [message, params]);

  return (
    <Box
      component={"div"}
      sx={{
        height: "100%",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Students Attendance
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <Item>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <TextField
                label="Search"
                value={params.search ? params.search : ""}
                onChange={(e) => {
                  handleSearch(e);
                }}
                //onBlur={Formik.handleBlur}
              />

              <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
                <InputLabel id="demo-simple-select-label">
                  Student Class
                </InputLabel>
                <Select
                  label="Student Class"
                  value={params.student_class ? params.student_class : ""}
                  onChange={(e) => {
                    handleClass(e);
                  }}
                >
                  <MenuItem value="">Select Class</MenuItem>
                  {classes &&
                    classes.map((x) => {
                      return (
                        <MenuItem key={x._id} value={x._id}>
                          {x.class_text} ({x.class_num})
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>

            <Box>
              {selectedClass && (
                <Attendee
                  classId={selectedClass}
                  handleMessage={handleMessage}
                  message={message}
                />
              )}
            </Box>
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Guardian Phone</TableCell>
                    <TableCell align="right">Class</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                    <TableCell align="right">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students &&
                    students.map((student) => (
                      <TableRow
                        key={student._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {student.name}
                        </TableCell>
                        <TableCell align="right">{student.gender}</TableCell>
                        <TableCell align="right">
                          {student.guardian_phone}
                        </TableCell>
                        <TableCell align="right">
                          {student.student_class.class_text}
                        </TableCell>
                        <TableCell align="right">
                          {attendanceData[student._id] !== undefined
                            ? `${attendanceData[student._id].toFixed(2)}%`
                            : "No Data"}
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`/school/attendance/${student._id}`}>
                            Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
