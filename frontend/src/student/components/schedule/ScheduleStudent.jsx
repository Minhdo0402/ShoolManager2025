import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../environment";

const localizer = momentLocalizer(moment);

export default function ScheduleStudent() {
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
  const fetchstudentDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
      console.log("student details", response.data);
      //setstudentDetails(response.data.student);
      setSelectedClass(response.data.student.student_class);
    } catch (error) {
      console.log("Error in student details fetching single data.", error);
    }
  };

  useEffect(() => {
    fetchstudentDetails();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      axios
        .get(`${baseApi}/schedule/fetch-with-class/${selectedClass._id}`)
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
      <h1>
        Schedule of Your Class [{selectedClass ? selectedClass.class_text : ""}]
      </h1>

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
