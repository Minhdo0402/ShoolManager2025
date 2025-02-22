// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { baseApi } from "../../../environment";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// export default function Attendee({ classId, handleMessage, message }) {
//   const [teachers, setteachers] = React.useState([]);
//   const [selectedTeacher, setSelectedTeacher] = React.useState("");

//   const handleSubmit = async () => {
//     try {
//       if (selectedTeacher) {
//         const response = await axios.patch(
//           `${baseApi}/class/update/${classId}`,
//           {
//             attendee: selectedTeacher,
//           }
//         );
//         console.log(response, "Submit attendee.");
//         handleMessage("Success in attendee save/update.", "success");
//       } else {
//         alert("Please select a teacher first.");
//       }
//     } catch (error) {
//       console.log("ERROR", error);
//     }
//   };

//   const [attendee, setAttendee] = useState(null);

//   const fetchClassDetails = async () => {
//     if (classId) {
//       try {
//         const response = await axios.get(`${baseApi}/class/single/${classId}`);
//         setAttendee(
//           response.data.data.attendee ? response.data.data.attendee : null
//         );
//         console.log("SINGLE CLASS", response);
//       } catch (error) {
//         console.log("ERROR", error);
//       }
//     }
//   };

//   const fetchteachers = () => {
//     axios
//       .get(`${baseApi}/teacher/fetch-with-query`, { params: {} })
//       .then((resp) => {
//         setteachers(resp.data.teachers);
//       })
//       .catch((e) => {
//         console.log("Error in fetching class.", e);
//       });
//   };

//   useEffect(() => {
//     console.log("CLASS ID", classId);
//     console.log("Attendee Data:", attendee);
//     fetchClassDetails();
//     fetchteachers();
//   }, [classId, message]);
//   return (
//     <>
//       <h1>Attendee</h1>
//       <Box>
//         {attendee && (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//             component={"div"}
//           >
//             <Typography variant="h5">Attendee Teacher :</Typography>
//             <Typography variant="h5">{attendee.name}</Typography>
//           </Box>
//         )}

//         <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
//           <InputLabel id="demo-simple-select-label">Select Teacher</InputLabel>
//           <Select
//             label="Select Teacher"
//             value={selectedTeacher}
//             onChange={(e) => {
//               setSelectedTeacher(e.target.value);
//             }}
//           >
//             <MenuItem value="">Select Teacher</MenuItem>
//             {teachers &&
//               teachers.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.name}
//                   </MenuItem>
//                 );
//               })}
//           </Select>
//         </FormControl>

//         <Button onClick={handleSubmit}>
//           {attendee ? "Change Attendee" : "Select Attendee"}
//         </Button>
//       </Box>
//     </>
//   );
// }

import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { baseApi } from "../../../environment";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function Attendee({ classId, handleMessage, message }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [attendee, setAttendee] = useState(null);

  // Xử lý khi nhấn nút chọn giảng viên
  const handleSubmit = async () => {
    try {
      if (selectedTeacher) {
        const response = await axios.patch(
          `${baseApi}/class/update/${classId}`,
          {
            attendee: selectedTeacher,
          }
        );
        console.log(response, "Submit attendee.");
        handleMessage("Success in attendee save/update.", "success");
      } else {
        alert("Please select a teacher first.");
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  // Lấy thông tin lớp học
  const fetchClassDetails = async () => {
    if (classId) {
      try {
        const response = await axios.get(`${baseApi}/class/single/${classId}`);
        setAttendee(response.data.data.attendee || null);
        console.log("SINGLE CLASS", response);
      } catch (error) {
        console.error("ERROR", error);
      }
    }
  };

  // Lấy danh sách giảng viên
  const fetchTeachers = () => {
    axios
      .get(`${baseApi}/teacher/fetch-with-query`, { params: {} })
      .then((resp) => {
        setTeachers(resp.data.teachers);
      })
      .catch((e) => {
        console.error("Error in fetching teachers.", e);
      });
  };

  useEffect(() => {
    console.log("CLASS ID", classId);
    console.log("Attendee Data:", attendee);
    fetchClassDetails();
    fetchTeachers();
  }, [classId, message]);

  return (
    <>
      <h1>Attendee</h1>
      <Box>
        {attendee && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
            component={"div"}
          >
            <Typography variant="h5">Attendee Teacher :</Typography>
            <Typography variant="h5">{attendee.name}</Typography>
          </Box>
        )}

        <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
          <InputLabel id="demo-simple-select-label">Select Teacher</InputLabel>
          <Select
            label="Select Teacher"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <MenuItem value="">Select Teacher</MenuItem>
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>
          {attendee ? "Change Attendee" : "Select Attendee"}
        </Button>
      </Box>
    </>
  );
}

// Kiểm tra kiểu dữ liệu props
Attendee.propTypes = {
  classId: PropTypes.string.isRequired, // classId là chuỗi và bắt buộc
  handleMessage: PropTypes.func.isRequired, // handleMessage là hàm và bắt buộc
  message: PropTypes.string, // message là chuỗi (không bắt buộc)
};

// Giá trị mặc định cho props không bắt buộc
Attendee.defaultProps = {
  message: "", // Mặc định là chuỗi rỗng nếu không truyền vào
};
