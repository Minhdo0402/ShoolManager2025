// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useEffect, useState } from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { useFormik } from "formik";
// import { examinationSchema } from "../../../yupSchema/examinationSchema";
// import { Button, Typography } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import axios from "axios";
// import { baseApi } from "../../../environment";
// import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

// export default function Examinations() {
//   const [examinations, setExaminations] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");

//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const handleMessageClose = () => {
//     setMessage("");
//   };

//   // const handleMessageNew = (msg, type) => {
//   //   setMessage(msg);
//   //   setMessageType(type);
//   // };

//   const dateFormat = (dateData) => {
//     const date = new Date(dateData);
//     //const dateHours = date.getHours();
//     //const dateMinutes = date.getMinutes();
//     return (
//       date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
//     );
//   };

//   const [editId, setEditId] = useState(null);

//   const handleEdit = (id) => {
//     setEditId(id);
//     const selectedExamination = examinations.filter((x) => x._id === id);
//     Formik.setFieldValue("date", selectedExamination[0].examDate);
//     Formik.setFieldValue("subject", selectedExamination[0].subject._id);
//     Formik.setFieldValue("examType", selectedExamination[0].examType);
//   };

//   const handleEditCancel = () => {
//     setEditId(null);
//     Formik.resetForm();
//   };

//   const handleDelete = (id) => {};

//   const initialValues = {
//     date: "",
//     subject: "",
//     examType: "",
//   };

//   const Formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: examinationSchema,
//     onSubmit: async (value) => {
//       try {
//         let URL = `${baseApi}/examination/create`;
//         if (editId) {
//           URL = `${baseApi}/examination/update/${editId}`;
//         }
//         const response = await axios.post(URL, {
//           date: value.date,
//           subjectId: value.subject,
//           classId: selectedClass,
//           examType: value.examType,
//         });
//         console.log("RESPONSE NEW EXAMINATION", response);
//         setMessage(response.data.message);
//         setMessageType("success");
//         Formik.resetForm();
//       } catch (error) {
//         setMessage("Error in Saving New Examination.");
//         setMessageType("error");
//         console.log(
//           "ERROR->(Saving New Examination-Examination Component",
//           error
//         );
//       }
//     },
//   });

//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/subject/all`);
//       setSubjects(response.data.data);
//     } catch (error) {
//       console.log("ERROR->(Fetching Subjects-Examination Component", error);
//     }
//   };

//   const [classes, setClasses] = useState([]);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${baseApi}/class/all`);
//       setClasses(response.data.data);
//       setSelectedClass(response.data.data[0]._id);
//     } catch (error) {
//       console.log("ERROR->(Fetching Subjects-Examination Component", error);
//     }
//   };

//   const fetchExaminations = async () => {
//     try {
//       if (selectedClass) {
//         const response = await axios.get(
//           `${baseApi}/examination/class/${selectedClass}`
//         );
//         setExaminations(response.data.examinations);
//       }
//     } catch (error) {
//       console.log(
//         "ERROR->(Saving Fetching Examination-Examination Component",
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     fetchExaminations();
//     fetchSubjects();
//   }, [message, selectedClass]);
//   return (
//     <>
//       {message && (
//         <MessageSnackbar
//           message={message}
//           type={messageType}
//           handleClose={handleMessageClose}
//         />
//       )}
//       <Paper sx={{ marginBottom: "20px" }}>
//         <Box>
//           <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
//             <InputLabel id="demo-simple-select-label">Class</InputLabel>
//             <Select
//               label="Subject"
//               onChange={(e) => {
//                 setSelectedClass(e.target.value);
//               }}
//               value={selectedClass}
//             >
//               <MenuItem value={""}>Select Class</MenuItem>
//               {classes.map((x) => {
//                 return (
//                   <MenuItem key={x._id} value={x._id}>
//                     {x.class_text}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//         </Box>
//       </Paper>
//       <Paper>
//         <Box
//           component="form"
//           noValidate
//           autoComplete="off"
//           onSubmit={Formik.handleSubmit}
//           sx={{ width: "24vw", minWidth: "310px", margin: "auto" }}
//         >
//           {editId ? (
//             <Typography variant="h4">Edit Exam</Typography>
//           ) : (
//             <Typography variant="h4">Add New Exam</Typography>
//           )}

//           <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
//             <DemoContainer components={["DatePicker"]} fullWidth>
//               <DatePicker
//                 fullWidth
//                 label="Basic date picker"
//                 value={Formik.values.date ? dayjs(Formik.values.date) : null}
//                 onChange={(newValue) => Formik.setFieldValue("date", newValue)}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </DemoContainer>
//           </LocalizationProvider>
//           {Formik.touched.date && Formik.errors.date && (
//             <p style={{ color: "red" }}>{Formik.errors.date}</p>
//           )}
//           <FormControl fullWidth sx={{ marginTop: "10px" }}>
//             <InputLabel id="demo-simple-select-label">Subject</InputLabel>
//             <Select
//               name="subject"
//               label="Subject"
//               onChange={Formik.handleChange}
//               onBlur={Formik.handleChange}
//               value={Formik.values.subject}
//             >
//               <MenuItem value={""}>Select Subject</MenuItem>
//               {subjects.map((subject) => {
//                 return (
//                   <MenuItem key={subject._id} value={subject._id}>
//                     {subject.subject_name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//           {Formik.touched.subject && Formik.errors.subject && (
//             <p style={{ color: "red" }}>{Formik.errors.subject}</p>
//           )}
//           <TextField
//             fullWidth
//             name="examType"
//             value={Formik.values.examType}
//             onChange={Formik.handleChange}
//             onBlur={Formik.handleChange}
//             label="Exam Type"
//             sx={{ marginTop: "10px" }}
//             variant="filled"
//           />
//           {Formik.touched.examType && Formik.errors.examType && (
//             <p style={{ color: "red" }}>{Formik.errors.examType}</p>
//           )}

//           <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
//             Submit
//           </Button>
//           {editId && (
//             <Button type="button" onClick={handleEditCancel} variant="outlined">
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Paper>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">Exam Date</TableCell>
//               <TableCell align="right">Subject</TableCell>
//               <TableCell align="right">Exam Type</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {examinations.map((examination) => (
//               <TableRow
//                 key={examination._id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="right" component="th" scope="row">
//                   {dateFormat(examination.examDate)}
//                 </TableCell>
//                 <TableCell align="right">
//                   {examination.subject ? examination.subject.subject_name : ""}
//                 </TableCell>
//                 <TableCell align="right">{examination.examType}</TableCell>
//                 <TableCell align="right">
//                   <Button
//                     variant="contained"
//                     sx={{ background: "skyblue" }}
//                     onClick={() => {
//                       handleEdit(examination._id);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ background: "tomato" }}
//                     onClick={() => {
//                       handleDelete(examination._id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { examinationSchema } from "../../../yupSchema/examinationSchema";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { baseApi } from "../../../environment";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function Examinations() {
  const [examinations, setExaminations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleMessageClose = () => setMessage("");

  const dateFormat = (dateData) => {
    const date = new Date(dateData);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleEdit = (id) => {
    setEditId(id);
    const selectedExamination = examinations.find((x) => x._id === id);
    if (selectedExamination) {
      formik.setFieldValue("date", selectedExamination.examDate);
      formik.setFieldValue("subject", selectedExamination.subject._id);
      formik.setFieldValue("examType", selectedExamination.examType);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this examination?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${baseApi}/examination/delete/${id}`
      );
      setMessage(response.data.message);
      setMessageType("success");

      // Refresh examination list after deletion
      fetchExaminations();
    } catch (error) {
      console.error("Error deleting examination:", error);
      setMessage("Error in deleting examination.");
      setMessageType("error");
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${baseApi}/subject/all`);
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
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
    fetchSubjects();
  }, [message, selectedClass]);

  const formik = useFormik({
    initialValues: { date: "", subject: "", examType: "" },
    validationSchema: examinationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting values:", values);
        let URL = `${baseApi}/examination`;
        if (editId) {
          URL = `${baseApi}/examination/update/${editId}`;
        }
        const response = await axios.post(URL, {
          date: values.date,
          subjectId: values.subject,
          classId: selectedClass,
          examType: values.examType,
        });
        setMessage(response.data.message);
        setMessageType("success");
        formik.resetForm();
        setEditId(null);
      } catch (error) {
        console.error("Error saving examination:", error);
        setMessage("Error in Saving New Examination.");
        setMessageType("error");
      }
    },
  });

  return (
    <>
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}
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
      <Paper>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%", maxWidth: "400px", margin: "auto" }}
        >
          <Typography variant="h4">
            {editId ? "Edit Exam" : "Add New Exam"}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Exam Date"
                value={formik.values.date ? dayjs(formik.values.date) : null}
                onChange={(newValue) => formik.setFieldValue("date", newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          {formik.touched.date && formik.errors.date && (
            <p style={{ color: "red" }}>{formik.errors.date}</p>
          )}
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel id="subject-select-label">Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              name="subject"
              onChange={formik.handleChange}
              value={formik.values.subject}
            >
              <MenuItem value="">Select Subject</MenuItem>
              {subjects.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.subject_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.touched.subject && formik.errors.subject && (
            <p style={{ color: "red" }}>{formik.errors.subject}</p>
          )}
          <TextField
            fullWidth
            name="examType"
            label="Exam Type"
            value={formik.values.examType}
            onChange={formik.handleChange}
            sx={{ marginTop: "10px" }}
          />
          {formik.touched.examType && formik.errors.examType && (
            <p style={{ color: "red" }}>{formik.errors.examType}</p>
          )}
          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Submit
          </Button>
          {editId && (
            <Button
              onClick={handleEditCancel}
              variant="outlined"
              sx={{ marginTop: "10px" }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Exam Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{dateFormat(exam.examDate)}</TableCell>
                <TableCell>{exam.subject?.subject_name || ""}</TableCell>
                <TableCell>{exam.examType}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(exam._id)}
                    variant="contained"
                    sx={{ background: "skyblue" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ background: "tomato" }}
                    onClick={() => {
                      handleDelete(exam._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
