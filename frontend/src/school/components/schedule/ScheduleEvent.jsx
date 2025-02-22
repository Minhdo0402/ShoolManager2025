/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { periodSchema } from "../../../yupSchema/periodSchema";
import { useState, useEffect } from "react";
import axios from "axios";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { baseApi } from "../../../environment";
import dayjs from "dayjs";

export default function ScheduleEvent({
  selectedClass,
  handleEventClose,
  handleMessageNew,
  edit,
  selectedEventId,
}) {
  const periods = [
    {
      id: 1,
      label: "Period 1 (10:00 AM - 11:00 AM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 2,
      label: "Period 2 (11:00 AM - 12:00 PM)",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 3,
      label: "Period 3 (12:00 PM - 1:00 PM)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 4,
      label: "Lunch Break (1:00 PM - 2:00 PM)",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 5,
      label: "Period 4 (2:00 PM - 3:00 PM)",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: 6,
      label: "Period 5 (3:00 PM - 4:00 PM)",
      startTime: "15:00",
      endTime: "16:00",
    },
  ];

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${baseApi}/schedule/delete/${selectedEventId}`)
        .then((resp) => {
          handleMessageNew(resp.data.message, "success");
          handleCancel();
        })
        .catch((e) => {
          console.log("Error", e);
          handleMessageNew("Error in Deleting Schedule.", "error"); // Thông báo khi có lỗi
        });
    }
  };

  const handleCancel = () => {
    Formik.resetForm();
    handleEventClose();
  };

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const initialValues = {
    teacher: "",
    subject: "",
    period: "",
    date: new Date(),
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: periodSchema,
    onSubmit: (values) => {
      const date = new Date(values.date); // Đảm bảo chuyển thành đối tượng Date
      const [startHour, startMinute] = values.period.split(",")[0].split(":");
      const [endHour, endMinute] = values.period.split(",")[1].split(":");
      let BACKEND_URL = `${baseApi}/schedule/create`;

      if (edit) {
        BACKEND_URL = `${baseApi}/schedule/update/${selectedEventId}`;
      }
      axios
        .post(BACKEND_URL, {
          ...values,
          selectedClass,
          startTime: new Date(date.setHours(startHour, startMinute)),
          endTime: new Date(date.setHours(endHour, endMinute)),
        })
        .then((resp) => {
          console.log("response", resp);
          handleMessageNew(resp.data.message, "success");
          Formik.resetForm();
          handleEventClose();
        })
        .catch((e) => {
          console.log("Error", e);
          handleMessageNew("Error in creating new Schedule.");
        });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const teacherResponse = await axios.get(
        `${baseApi}/teacher/fetch-with-query`,
        { params: {} }
      );
      const subjectResponse = await axios.get(`${baseApi}/subject/all`);
      setTeachers(teacherResponse.data.teachers);
      setSubjects(subjectResponse.data.data);
    };
    fetchData();
  }, []);

  const dateFormat = (date) => {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();
    return `${dateHours}:${dateMinutes < 10 ? "0" : ""}${dateMinutes}`;
  };

  useEffect(() => {
    if (selectedEventId) {
      axios
        .get(`${baseApi}/schedule/fetch/${selectedEventId}`)
        .then((resp) => {
          let start = new Date(resp.data.data.startTime);
          let end = new Date(resp.data.data.endTime);
          Formik.setFieldValue("teacher", resp.data.data.teacher);
          Formik.setFieldValue("subject", resp.data.data.subject);
          Formik.setFieldValue("date", start);
          const finalFormattedTime = dateFormat(start) + "," + dateFormat(end);
          Formik.setFieldValue("period", `${finalFormattedTime}`);
          console.log("Final", finalFormattedTime);
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    }
  }, [selectedEventId]);

  return (
    <>
      <Box
        component="form"
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          margin: "auto", // căn giữa theo chiều ngang
        }}
        onSubmit={Formik.handleSubmit}
      >
        {edit ? (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Edit Period
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Add New Period
          </Typography>
        )}

        {/* Teachers Field */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Teachers</InputLabel>
          <Select
            value={Formik.values.teacher}
            name="teacher"
            label="Teacher"
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
          {Formik.touched.teacher && Formik.errors.teacher && (
            <p style={{ color: "red" }}>{Formik.errors.teacher}</p>
          )}
        </FormControl>

        {/* Subjects Field */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Subjects</InputLabel>
          <Select
            value={Formik.values.subject}
            name="subject"
            label="Subject"
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
          >
            {subjects &&
              subjects.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.subject_name}
                </MenuItem>
              ))}
          </Select>
          {Formik.touched.subject && Formik.errors.subject && (
            <p style={{ color: "red" }}>{Formik.errors.subject}</p>
          )}
        </FormControl>

        {/* Periods Field */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Periods</InputLabel>
          <Select
            value={Formik.values.period}
            name="period"
            label="Periods"
            onChange={(e) => {
              console.log("Selected period:", e.target.value); // Log giá trị chọn
              Formik.handleChange(e);
            }}
            onBlur={(e) => {
              console.log("Touched field:", e.target.name); // Log field name khi blur
              Formik.handleBlur(e);
            }}
          >
            {periods.map((x) => (
              <MenuItem key={x.id} value={`${x.startTime},${x.endTime}`}>
                {x.label}
              </MenuItem>
            ))}
          </Select>

          {Formik.touched.period && Formik.errors.period && (
            <p style={{ color: "red" }}>{Formik.errors.period}</p>
          )}
        </FormControl>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ mb: 2 }}>
            <DatePicker
              label="Basic date picker"
              value={Formik.values.date ? dayjs(Formik.values.date) : null}
              onChange={(newValue) => Formik.setFieldValue("date", newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button type="submit" sx={{ mt: 1 }} variant="contained">
          Submit
        </Button>
        <Button
          type="button"
          sx={{ mt: 1, background: "red" }}
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          type="button"
          sx={{ mt: 1 }}
          variant="outlined"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}
