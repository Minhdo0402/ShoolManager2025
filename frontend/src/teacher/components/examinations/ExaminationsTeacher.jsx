import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { baseApi } from "../../../environment";

export default function ExaminationsTeacher() {
  const [examinations, setExaminations] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const dateFormat = (dateData) => {
    const date = new Date(dateData);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseApi}/class/all`);
      setClasses(response.data.data);
      setSelectedClass(response.data.data[0]?._id || "");
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchExaminations = async () => {
    if (!selectedClass) return;
    try {
      const response = await axios.get(
        `${baseApi}/examination/class/${selectedClass}`
      );
      setExaminations(response.data.examinations);
    } catch (error) {
      console.error("Error fetching examinations:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchExaminations();
  }, [selectedClass]);

  return (
    <>
      <Paper sx={{ marginBottom: "20px" }}>
        <Box>
          <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
            <InputLabel id="class-select-label">Class</InputLabel>
            <Select
              labelId="class-select-label"
              onChange={(e) => setSelectedClass(e.target.value)}
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Exam Date</b>
              </TableCell>
              <TableCell>
                <b>Subject</b>
              </TableCell>
              <TableCell>
                <b>Exam Type</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{dateFormat(exam.examDate)}</TableCell>
                <TableCell>{exam.subject?.subject_name || ""}</TableCell>
                <TableCell>{exam.examType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
