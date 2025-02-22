import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { loginSchema } from "../../../yupSchema/loginSchema";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Login() {
  const [role, setRole] = React.useState("student");
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      let URL;
      if (role === "student") {
        URL = `http://localhost:5000/api/student/login`;
      } else if (role === "teacher") {
        URL = `http://localhost:5000/api/teacher/login`;
      } else if (role === "school") {
        URL = `http://localhost:5000/api/school/login`;
      }
      axios
        .post(URL, { ...values })
        .then((resp) => {
          const token = resp.headers.get("Authorization");
          if (token) {
            localStorage.setItem("token", token);
          }
          const user = resp.data.user;
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            login(user);
          }
          setMessage(resp.data.message); // Display success message
          setMessageType("success");
          Formik.resetForm();
          navigate(`/${role}`);
        })
        .catch((e) => {
          setMessage(
            e.response?.data?.message ||
              "An error occurred during registration."
          ); // Display error message
          setMessageType("error");
          console.error("Error:", e);
        });
    },
  });

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  return (
    <Box
      component={"div"}
      sx={{
        background:
          "url(https://clipart-library.com/8300/db-clipart-bundle-of-school-supplies-cut-files-37e51cb5640f299d302f63d523fa4d1681349bb653fc5242197b82f05c222a30.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        minHeight: "80vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}
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
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <MenuItem value={"student"}>Student</MenuItem>
            <MenuItem value={"teacher"}>Teacher</MenuItem>
            <MenuItem value={"school"}>School</MenuItem>
          </Select>
        </FormControl>

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

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
