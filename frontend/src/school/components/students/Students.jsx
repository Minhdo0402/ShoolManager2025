import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { baseApi } from "../../../environment";
import {
  studentEditSchema,
  studentSchema,
} from "../../../yupSchema/studentSchema";

//ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Students() {
  const [edit, setEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [classes, setClasses] = React.useState([]);

  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  // RESETING IMAGE

  const fileInputRef = React.useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setImageUrl(null);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`http://localhost:5000/api/student/delete/${id}`)
        .then((resp) => {
          setMessage(resp.data.message); // Display success message
          setMessageType("success");
        })
        .catch((e) => {
          setMessage("Error in Delete."); // Display error message
          setMessageType("error");
          console.error("Error:", e);
        });
    }
  };

  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    Formik.resetForm();
  };

  const handleEdit = (id) => {
    setEdit(true);
    setEditId(id);
    const filteredStudent = students.filter((x) => x._id === id);
    console.log("filtered student", filteredStudent);
    Formik.setFieldValue("email", filteredStudent[0].email);
    Formik.setFieldValue("name", filteredStudent[0].name);
    Formik.setFieldValue("student_class", filteredStudent[0].student_class._id);
    Formik.setFieldValue("age", filteredStudent[0].age);
    Formik.setFieldValue("gender", filteredStudent[0].gender);
    Formik.setFieldValue("guardian", filteredStudent[0].guardian);
    Formik.setFieldValue("guardian_phone", filteredStudent[0].guardian_phone);
  };

  const initialValues = {
    email: "",
    name: "",
    student_class: "",
    age: "",
    gender: "",
    guardian: "",
    guardian_phone: "",
    password: "",
    confirm_password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: edit ? studentEditSchema : studentSchema,
    onSubmit: (values) => {
      if (edit) {
        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("email", values.email);
        fd.append("age", values.age);
        fd.append("gender", values.gender);
        fd.append("guardian", values.guardian);
        fd.append("guardian_phone", values.guardian_phone);
        fd.append("student_class", values.student_class);

        if (file) {
          fd.append("image", file, file.name);
        }
        if (values.password) {
          fd.append("password", values.password);
        }
        axios
          .patch(`http://localhost:5000/api/student/update/${editId}`, fd)
          .then((resp) => {
            setMessage(resp.data.message); // Display success message
            setMessageType("success");
            Formik.resetForm();
            handleClearFile();
          })
          .catch((e) => {
            setMessage("Error in Updating Student. "); // Display error message
            setMessageType("error");
            console.error("Error:", e);
          });
      } else {
        if (file) {
          const fd = new FormData();
          fd.append("image", file, file.name);
          fd.append("name", values.name);
          fd.append("email", values.email);
          fd.append("age", values.age);
          fd.append("gender", values.gender);
          fd.append("guardian", values.guardian);
          fd.append("guardian_phone", values.guardian_phone);
          fd.append("student_class", values.student_class);
          fd.append("password", values.password);

          axios
            .post(`http://localhost:5000/api/student/register`, fd)
            .then((resp) => {
              setMessage(resp.data.message); // Display success message
              setMessageType("success");
              Formik.resetForm();
              handleClearFile();
            })
            .catch((e) => {
              setMessage("Error in Creating New Student. "); // Display error message
              setMessageType("error");
              console.error("Error:", e);
            });
        } else {
          setMessage("Please Add School Image");
          setMessageType("error");
        }
      }
    },
  });

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
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
  const handleClass = (e) => {
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
        console.log("response students", resp);
      })
      .catch((e) => {
        console.log("Error in fetching class.", e);
      });
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
        Students
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          minWidth: "230px",
          margin: "auto",
          background: "#fff",
        }}
        noValidate
        autoComplete="off"
        onSubmit={Formik.handleSubmit}
      >
        {edit ? (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Edit Students
          </Typography>
        ) : (
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Add New Student
          </Typography>
        )}

        <Typography>Add Student Picture</Typography>
        <TextField
          type="file"
          inputRef={fileInputRef}
          onChange={(event) => {
            addImage(event);
          }}
        />
        {imageUrl && (
          <Box>
            <CardMedia component={"img"} height={"240px"} image={imageUrl} />
          </Box>
        )}
        <TextField
          name="name"
          label="Name"
          value={Formik.values.name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.name && Formik.errors.name && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.name}
          </p>
        )}

        <TextField
          name="email"
          label="Email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.email && Formik.errors.email && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.email}
          </p>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Formik.values.student_class}
            label="Student Class"
            name="student_class"
            onChange={Formik.handleChange}
          >
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

        {Formik.touched.student_class && Formik.errors.student_class && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.student_class}
          </p>
        )}

        <TextField
          name="age"
          label="Age"
          value={Formik.values.age}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.age && Formik.errors.age && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.age}
          </p>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Formik.values.gender}
            label="Gender"
            name="gender"
            onChange={Formik.handleChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
        {Formik.touched.gender && Formik.errors.gender && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.gender}
          </p>
        )}

        <TextField
          name="guardian"
          label="Guardian Name"
          value={Formik.values.guardian}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.guardian && Formik.errors.guardian && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.guardian}
          </p>
        )}

        <TextField
          name="guardian_phone"
          label="Guardian Phone"
          value={Formik.values.guardian_phone}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.guardian_phone && Formik.errors.guardian_phone && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.guardian_phone}
          </p>
        )}

        <TextField
          type="password"
          name="password"
          label="Password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.password && Formik.errors.password && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.password}
          </p>
        )}

        <TextField
          type="password"
          name="confirm_password"
          label="Confirm Password"
          value={Formik.values.confirm_password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.confirm_password && Formik.errors.confirm_password && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.confirm_password}
          </p>
        )}

        <Button sx={{ width: "120px" }} type="submit" variant="contained">
          Submit
        </Button>
        {edit && (
          <Button
            sx={{ width: "120px" }}
            onClick={() => {
              cancelEdit();
            }}
            type="button"
            variant="outlined"
          >
            Cancel
          </Button>
        )}
      </Box>

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
          <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
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
      {/* <Box
        component={"div"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // Giữ tất cả card căn giữa
          gap: "15px", // Tạo khoảng cách đồng đều giữa các card
          marginTop: "40px",
        }}
      >
        {students &&
          students.map((student) => {
            return (
              <Card
                key={student._id}
                sx={{
                  width: "345px", // Đảm bảo kích thước đồng đều
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="340"
                    image={`/images/uploaded/student/${student.student_image}`}
                    alt="student"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Name :</span>{" "}
                      {student.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Email :</span>{" "}
                      {student.email}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Student Class :</span>{" "}
                      {student.student_class.class_text}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Age :</span>{" "}
                      {student.age}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Gender :</span>{" "}
                      {student.gender}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Guardian Name :</span>{" "}
                      {student.guardian}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Guardian Phone :</span>{" "}
                      {student.guardian_phone}
                    </Typography>
                  </CardContent>
                  <Button
                    onClick={() => {
                      handleEdit(student._id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(student._id);
                    }}
                    sx={{ marginLeft: "10px" }}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                </CardActionArea>
              </Card>
            );
          })}
      </Box> */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Đảm bảo card tự động xuống dòng nếu không đủ chỗ
          justifyContent: "center", // Căn giữa nội dung
          gap: "20px", // Khoảng cách giữa các card
          marginTop: "40px",
          maxWidth: "100%", // Không để tràn khung
          overflow: "hidden", // Ẩn thanh cuộn ngang
        }}
      >
        {students.slice(0, 8).map((student) => (
          <Card key={student._id} sx={{ width: "345px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image={`/images/uploaded/student/${student.student_image}`}
                alt="student"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  <strong>Name :</strong> {student.name}
                </Typography>
                <Typography gutterBottom variant="h5">
                  <strong>Email :</strong> {student.email}
                </Typography>
                <Typography gutterBottom variant="h5">
                  <strong>Student Class :</strong>{" "}
                  {student.student_class.class_text}
                </Typography>
                <Typography gutterBottom variant="h5">
                  <strong>Age :</strong> {student.age}
                </Typography>
                <Typography gutterBottom variant="h5">
                  <strong>Gender :</strong> {student.gender}
                </Typography>
                <Typography gutterBottom variant="h5">
                  <strong>Guardian Name :</strong> {student.guardian}
                </Typography>
                <Typography gutterBottom variant="h5">
                  <strong>Guardian Phone :</strong> {student.guardian_phone}
                </Typography>
              </CardContent>
              <Button onClick={() => handleEdit(student._id)}>
                <EditIcon />
              </Button>
              <Button
                onClick={() => handleDelete(student._id)}
                sx={{ marginLeft: "10px" }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </Button>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
