import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../environment";
import { CardMedia } from "@mui/material";

export default function StudentDetails() {
  const [studentDetails, setstudentDetails] = useState(null);

  const fetchstudentDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
      console.log("student details", response.data);
      setstudentDetails(response.data.student);
    } catch (error) {
      console.log("Error in student details fetching single data.", error);
    }
  };

  useEffect(() => {
    fetchstudentDetails();
  }, []);
  return (
    <>
      {studentDetails && (
        <>
          <CardMedia
            component="img"
            sx={{
              height: "310px",
              width: "310px",
              margin: "auto",
              borderRadius: "50%",
            }}
            image={`./images/uploaded/student/${studentDetails?.student_image}`} // Đảm bảo student_image là tên ảnh đúng
            alt="student"
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Name :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Email :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.email}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Class :</b>
                  </TableCell>
                  <TableCell align="right">
                    {studentDetails.student_class.class_text}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Age :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.age}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Gender :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.gender}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Guardian :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.guardian}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
