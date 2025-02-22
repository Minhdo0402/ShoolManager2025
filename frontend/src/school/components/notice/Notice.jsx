import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { noticeSchema } from "../../../yupSchema/noticeSchema";
import axios from "axios";
import { baseApi } from "../../../environment";
import { useEffect, useState } from "react";

//ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function Notice() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const [notices, setNotices] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEdit = (id, title, message, audience) => {
    console.log(id);
    setEdit(true);
    setEditId(id);
    Formik.setFieldValue("title", title);
    Formik.setFieldValue("message", message);
    Formik.setFieldValue("audience", audience);
  };

  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    Formik.resetForm();
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${baseApi}/notice/delete/${id}`)
      .then((resp) => {
        setMessage(resp.data.message);
        setMessageType("success");
      })
      .catch((e) => {
        console.log(e);
        setMessage("Error in delete.");
        setMessageType("error");
      });
  };
  const Formik = useFormik({
    initialValues: { title: "", message: "", audience: "" },
    validationSchema: noticeSchema,
    onSubmit: (values) => {
      console.log(values);
      if (edit) {
        axios
          .patch(`${baseApi}/notice/update/${editId}`, { ...values })
          .then((resp) => {
            setMessage(resp.data.message);
            setMessageType("success");
            cancelEdit();
          })
          .catch((e) => {
            console.log("Error in Notice Updating", e);
            setMessage("Error in Update");
            setMessageType("error");
          });
      } else {
        axios
          .post(`${baseApi}/notice/create`, { ...values })
          .then((resp) => {
            console.log("Notice add response", resp);
            setMessage(resp.data.message);
            setMessageType("success");
          })
          .catch((e) => {
            console.log("Error in Notice", e);
            setMessage("Error in Saving");
            setMessageType("error");
          });
      }
      Formik.resetForm();
    },
  });

  const fetchAllNotices = () => {
    axios
      .get(`${baseApi}/notice/all`)
      .then((resp) => {
        setNotices(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching all Notices", e);
      });
  };

  useEffect(() => {
    fetchAllNotices();
  }, [message]);
  return (
    <>
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}
      <h1>Notice</h1>
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
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            Edit Notice
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            Add New Notice
          </Typography>
        )}

        <TextField
          name="title"
          label="Title"
          value={Formik.values.title}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.title && Formik.errors.title && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.title}
          </p>
        )}

        <TextField
          multiline
          rows={4}
          name="message"
          label="Message"
          value={Formik.values.message}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.message && Formik.errors.message && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.message}
          </p>
        )}

        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="subject-select-label">Audience</InputLabel>
          <Select
            label="Audience"
            name="audience"
            onChange={Formik.handleChange}
            onBlur={Formik.handleChange}
            value={Formik.values.audience}
          >
            <MenuItem value="">Select audience</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>
        </FormControl>
        {Formik.touched.audience && Formik.errors.audience && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.audience}
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
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {notices &&
          notices.map((x) => {
            return (
              <Paper key={x._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h4">
                    <b>Title: </b>
                    {x.title}
                  </Typography>
                  <Typography variant="h4">
                    <b>Message: </b>
                    {x.message}
                  </Typography>
                  <Typography variant="h4">
                    <b>Audience: </b>
                    {x.audience}
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(x._id, x.title, x.message, x.audience);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(x._id);
                    }}
                    sx={{ color: "red" }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </Box>
              </Paper>
            );
          })}
      </Box>
    </>
  );
}
