import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  FormControl,
  //InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../environment";

const localizer = momentLocalizer(moment);

export default function ScheduleTeacher() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const date = new Date();
  const myEventsList = [
    {
      id: 1,
      title: "Subject: History, Teacher: Hamid",
      start: new Date(date.setHours(11, 30)),
      end: new Date(date.setHours(14, 30)),
    },
  ];

  const [events, setEvents] = useState(myEventsList);

  useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((resp) => {
        console.log("Phản hồi từ API lớp học:", resp.data);
        setClasses(resp.data.data);
        setSelectedClass(resp.data.data[0]._id);
      })
      .catch((e) => {
        console.log("Fetch Class Error", e);
      });
  }, []);

  useEffect(() => {
    if (selectedClass) {
      axios
        .get(`${baseApi}/schedule/fetch-with-class/${selectedClass}`)
        .then((resp) => {
          console.log("Schedule Data:", resp.data);
          setEvents(
            resp.data.data.map((x) => ({
              id: x._id,
              title: `Sub: ${x.subject.subject_name}, Teacher: ${x.teacher.name}`,
              start: new Date(x.startTime),
              end: new Date(x.endTime),
            }))
          );
        })
        .catch((e) => {
          console.log("Error fetching schedule:", e);
        });
    }
  }, [selectedClass]);

  return (
    <>
      <h1>Schedule</h1>
      <FormControl>
        <Typography variant="h5">Class</Typography>
        <Select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
          }}
        >
          {classes &&
            classes.map((x) => (
              <MenuItem key={x._id} value={x._id}>
                {x.class_text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week", "day", "agenda"]}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
        startAccessor="start"
        endAccessor="end"
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: "100%", width: "100%" }}
      />
    </>
  );
}
