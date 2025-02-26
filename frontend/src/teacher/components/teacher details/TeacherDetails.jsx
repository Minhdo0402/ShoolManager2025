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

export default function TeacherDetails() {
  const [teacherDetails, setTeacherDetails] = useState(null);

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/teacher/fetch-single`);
      console.log("teacher details", response.data);
      setTeacherDetails(response.data.teacher);
    } catch (error) {
      console.log("Error in teacher details fetching single data.", error);
    }
  };

  useEffect(() => {
    fetchTeacherDetails();
  }, []);
  return (
    <>
      {teacherDetails && (
        <>
          <CardMedia
            component="img"
            sx={{
              height: "310px",
              width: "310px",
              margin: "auto",
              borderRadius: "50%",
            }}
            image={`./images/uploaded/teacher/${teacherDetails?.teacher_image}`} // Đảm bảo teacher_image là tên ảnh đúng
            alt="Teacher"
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Name :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Email :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.email}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Age :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.age}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Gender :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.gender}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Qualification :</b>
                  </TableCell>
                  <TableCell align="right">
                    {teacherDetails.qualification}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
