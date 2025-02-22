import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../environment";
import { Typography } from "@mui/material";

export default function ExaminationsStudent() {
  const [examinations, setExaminations] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const dateFormat = (dateData) => {
    const date = new Date(dateData);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
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

  const [className, setClassName] = useState("");

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
      setSelectedClass(response.data.student.student_class._id);
      setClassName(response.data.student.student_class.class_text);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    fetchExaminations();
  }, [selectedClass]);

  return (
    <>
      <Typography variant="h4">
        Examinations Of Your Class [{className}]
      </Typography>
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
