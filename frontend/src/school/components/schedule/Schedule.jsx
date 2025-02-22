import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  FormControl,
  //InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleEvent from "./ScheduleEvent";
import axios from "axios";
import { baseApi } from "../../../environment";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const handleMessageNew = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newPeriod, setNewPeriod] = useState(false);

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

  const handleEventClose = () => {
    setNewPeriod(false);
    setEdit(false);
    setSelectedEventId(null);
  };

  const [edit, setEdit] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const handleSelectEvent = (event) => {
    setEdit(true);
    setSelectedEventId(event.id);
    console.log(event);
  };

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
          console.log(resp.data.data);
          const respData = resp.data.data.map((x) => {
            return {
              id: x._id,
              title: `Sub: ${x.subject.subject_name}, Teacher: ${x.teacher.name}`,
              start: new Date(x.startTime),
              end: new Date(x.endTime),
            };
          });
          setEvents(respData);
        })
        .catch((e) => {
          console.log("Error in fetching Schedule", e);
        });
    }
  }, [selectedClass, message]);

  return (
    <>
      <h1>Schedule</h1>
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}
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
      <Button onClick={() => setNewPeriod(true)}>Add New Period</Button>
      {(newPeriod || edit) && (
        <ScheduleEvent
          selectedClass={selectedClass}
          handleEventClose={handleEventClose}
          handleMessageNew={handleMessageNew}
          edit={edit}
          selectedEventId={selectedEventId}
        />
      )}
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
        onSelectEvent={handleSelectEvent}
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: "100%", width: "100%" }}
      />
    </>
  );
}
