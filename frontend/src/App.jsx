import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import School from "./school/School";
import Dashboard from "./school/components/dashboard/Dashboard";
import Examination from "./school/components/examinations/Examinations";
import Notice from "./school/components/notice/Notice";
import Class from "./school/components/class/Class";
import Schedule from "./school/components/schedule/Schedule";
import Students from "./school/components/students/Students";
import Subjects from "./school/components/subjects/Subjects";
import Teachers from "./school/components/teachers/Teachers";
import Client from "./client/Client";
import Home from "./client/components/home/Home";
import Login from "./client/components/login/Login";
import Register from "./client/components/register/Register";
import Teacher from "./teacher/Teacher";
import TeacherDetails from "./teacher/components/teacher details/TeacherDetails";
import ScheduleTeacher from "./teacher/components/schedule/ScheduleTeacher";
import AttendanceTeacher from "./teacher/components/attendance/AttendanceTeacher";
import ExaminationsTeacher from "./teacher/components/examinations/ExaminationsTeacher";
import NoticeTeacher from "./teacher/components/notice/NoticeTeacher";
import Student from "./student/Student";
import StudentDetails from "./student/components/student details/StudentDetails";
import ScheduleStudent from "./student/components/schedule/ScheduleStudent";
import AttendanceStudent from "./student/components/attendance/AttendanceStudent";
import ExaminationsStudent from "./student/components/examinations/ExaminationsStudent";
import NoticeStudent from "./student/components/notice/NoticeStudent";
import ProtectedRoute from "./guard/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import AttendanceStudentList from "./school/components/attendance/AttendanceStudentList";
import AttendanceDetails from "./school/components/attendance/AttendanceDetails";
import LogOut from "./client/components/logout/LogOut";
import DraggableButton from "./basic utility components/draggable/DraggableButton";
import { ThemeProvider } from "@emotion/react";
import { useContext } from "react";
import darkTheme from "./basic utility components/dark theme/darkTheme";
import lightTheme from "./basic utility components/light theme/lightTheme";

function App() {
  const { dark } = useContext(AuthContext);

  return (
    // <AuthProvider>
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <DraggableButton />
      <BrowserRouter>
        <Routes>
          {/* SCHOOL ROUTE */}
          <Route
            path="school"
            element={
              <ProtectedRoute allowedRoles={["SCHOOL"]}>
                <School />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<AttendanceStudentList />} />
            <Route path="attendance/:id" element={<AttendanceDetails />} />
            <Route path="class" element={<Class />} />
            <Route path="examinations" element={<Examination />} />
            <Route path="notice" element={<Notice />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="students" element={<Students />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>

          {/* STUDENT */}
          <Route
            path="student"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <Student />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDetails />} />
            <Route path="schedule" element={<ScheduleStudent />} />
            <Route path="attendance" element={<AttendanceStudent />} />
            <Route path="examinations" element={<ExaminationsStudent />} />
            <Route path="notice" element={<NoticeStudent />} />
          </Route>
          {/* TEACHER */}
          {/* <Route
            path="teacher"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <Student />
                <Teacher />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDetails />} />
            <Route path="schedule" element={<ScheduleTeacher />} />
            <Route path="attendance" element={<AttendanceTeacher />} />
            <Route path="examinations" element={<ExaminationsTeacher />} />
            <Route path="notice" element={<NoticeTeacher />} />
          </Route> */}
          <Route
            path="teacher"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <Teacher />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDetails />} />
            <Route path="schedule" element={<ScheduleTeacher />} />
            <Route path="attendance" element={<AttendanceTeacher />} />
            <Route path="examinations" element={<ExaminationsTeacher />} />
            <Route path="notice" element={<NoticeTeacher />} />
          </Route>

          {/* CLIENT */}
          <Route path="/" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<LogOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    // </AuthProvider>
  );
}

export default App;
