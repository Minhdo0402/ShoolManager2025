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
  teacherEditSchema,
  teacherSchema,
} from "../../../yupSchema/teacherSchema";

//ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Teachers() {
  const [edit, setEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [setClasses] = React.useState([]);

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
        .delete(`http://localhost:5000/api/teacher/delete/${id}`)
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
    const filteredteacher = teachers.filter((x) => x._id === id);
    console.log("filtered teacher", filteredteacher);
    Formik.setFieldValue("email", filteredteacher[0].email);
    Formik.setFieldValue("name", filteredteacher[0].name);
    Formik.setFieldValue("age", filteredteacher[0].age);
    Formik.setFieldValue("gender", filteredteacher[0].gender);
    Formik.setFieldValue("qualification", filteredteacher[0].qualification);
  };

  const initialValues = {
    email: "",
    name: "",
    age: "",
    gender: "",
    qualification: "",
    password: "",
    confirm_password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: edit ? teacherEditSchema : teacherSchema,
    onSubmit: (values) => {
      if (edit) {
        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("email", values.email);
        fd.append("age", values.age);
        fd.append("gender", values.gender);
        fd.append("qualification", values.qualification);

        if (file) {
          fd.append("image", file, file.name);
        }
        if (values.password) {
          fd.append("password", values.password);
        }
        axios
          .patch(`http://localhost:5000/api/teacher/update/${editId}`, fd)
          .then((resp) => {
            setMessage(resp.data.message); // Display success message
            setMessageType("success");
            Formik.resetForm();
            handleClearFile();
          })
          .catch((e) => {
            setMessage("Error in Updating Teacher. "); // Display error message
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
          fd.append("qualification", values.qualification);
          fd.append("password", values.password);

          axios
            .post(`http://localhost:5000/api/teacher/register`, fd)
            .then((resp) => {
              setMessage(resp.data.message); // Display success message
              setMessageType("success");
              Formik.resetForm();
              handleClearFile();
            })
            .catch((e) => {
              setMessage("Error in Creating New teacher. "); // Display error message
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

  const handleSearch = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: e.target.value || undefined,
    }));
  };

  const [teachers, setteachers] = React.useState([]);
  const fetchteachers = () => {
    axios
      .get(`${baseApi}/teacher/fetch-with-query`, { params })
      .then((resp) => {
        setteachers(resp.data.teachers);
        console.log("response teachers", resp);
      })
      .catch((e) => {
        console.log("Error in fetching class.", e);
      });
  };

  React.useEffect(() => {
    fetchClasses();
  }, []);

  React.useEffect(() => {
    fetchteachers();
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
        Teachers
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
            Edit teachers
          </Typography>
        ) : (
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Add New teacher
          </Typography>
        )}

        <Typography>Add Teacher Picture</Typography>
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
          name="qualification"
          label="Qualification"
          value={Formik.values.qualification}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.qualification && Formik.errors.qualification && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.qualification}
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
        {teachers &&
          teachers.map((teacher) => {
            return (
              <Card
                key={teacher._id}
                sx={{ maxWidth: 345, marginRight: "15px" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="340"
                    image={`/images/uploaded/teacher/${teacher.teacher_image}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Name :</span>{" "}
                      {teacher.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Email :</span>{" "}
                      {teacher.email}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Age :</span>{" "}
                      {teacher.age}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Gender :</span>{" "}
                      {teacher.gender}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <span style={{ fontWeight: 700 }}>Qualification :</span>{" "}
                      {teacher.qualification}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    ></Typography>
                  </CardContent>
                  <Button
                    onClick={() => {
                      handleEdit(teacher._id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(teacher._id);
                    }}
                    sx={{ marginLeft: "10px" }}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                </CardActionArea>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
}
