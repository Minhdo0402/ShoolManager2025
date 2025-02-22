import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../../../environment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts/PieChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
}));

export default function AttendanceStudent() {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentId, setStudentId] = useState(null);

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
      setStudentId(response.data.student._id);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchAttendanceData = async () => {
    if (!studentId) return;

    try {
      const response = await axios.get(`${baseApi}/attendance/${studentId}`);
      const respData = response.data.data || response.data;
      setAttendanceData(respData);

      let presentCount = 0;
      let absentCount = 0;
      respData.forEach((attendance) => {
        if (attendance.status === "present") presentCount++;
        else if (attendance.status === "absent") absentCount++;
      });

      setPresent(presentCount);
      setAbsent(absentCount);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchAttendanceData();
    }
  }, [studentId]);

  return (
    <>
      <h1 style={{ paddingLeft: "20px" }}>Attendance Details</h1>
      <Grid container spacing={4} style={{ padding: "0 20px" }}>
        {/* PieChart Section */}
        <Grid item xs={6}>
          <Item style={{ height: "250px" }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: present, label: "Present" },
                    { id: 1, value: absent, label: "Absent" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </Item>
        </Grid>

        {/* Attendance Table Section */}
        <Grid item xs={6}>
          <Item style={{ height: "250px", textAlign: "left" }}>
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 300 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.length > 0 ? (
                    attendanceData.map((attendance) => (
                      <TableRow key={attendance._id}>
                        <TableCell>{convertDate(attendance.date)}</TableCell>
                        <TableCell align="right">{attendance.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
