/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseApi } from "../../../environment";
import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function Dashboard() {
  const [school, setSchool] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [edit, setEdit] = useState(false);

  // IMAGE HANDLING
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  // RESETING IMAGE

  const fileInputRef = useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setImageUrl(null);
  };

  //MESSAGE
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const handleEditSubmit = () => {
    const fd = new FormData();
    fd.append("school_name", schoolName);
    if (file) {
      fd.append("image", file, file.name);
    }
    axios
      .patch(`${baseApi}/school/update`, fd)
      .then((resp) => {
        setMessage(resp.data.message); // Display success message
        setMessageType("success");
        cancelEdit();
      })
      .catch((e) => {
        setMessage(e.response.data.message); // Display error message
        setMessageType("error");
        console.error("Error:", e);
      });
  };

  const cancelEdit = () => {
    setEdit(false);
    handleClearFile();
  };

  const fetchSchool = () => {
    axios
      .get(`${baseApi}/school/fetch-single`)
      .then((resp) => {
        console.log(resp);
        setSchool(resp.data.school);
        setSchoolName(resp.data.school.school_name);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    fetchSchool();
  }, [message]);
  return (
    <>
      <h1>Dashboard</h1>
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}
      {edit && (
        <>
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
          >
            <Typography>Add School Picture</Typography>
            <TextField
              type="file"
              inputRef={fileInputRef}
              onChange={(event) => {
                addImage(event);
              }}
            />
            {imageUrl && (
              <Box>
                <CardMedia
                  component={"img"}
                  height={"240px"}
                  image={imageUrl}
                />
              </Box>
            )}
            <TextField
              label="School Name"
              value={schoolName}
              onChange={(e) => {
                setSchoolName(e.target.value);
              }}
            />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit Edit
            </Button>
            <Button
              variant="contained"
              sx={{ background: "#000", color: "white" }}
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}
      {school && (
        <Box
          sx={{
            position: "relative",
            height: "500px",
            width: "100%",
            background: `url(/images/uploaded/school/${school.school_image})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">{school.school_name}</Typography>

          <Box
            component="div"
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              height: "50px",
              width: "50px",
              //zIndex: 3, // Đảm bảo ô vuông nằm trên nền
            }}
          >
            <Button
              variant="outlined"
              sx={{
                background: "#fff",
                borderRadius: "50%", // Bo tròn nút thành hình tròn
                //minWidth: "50px", // Đảm bảo kích thước nút
                height: "50px", // Đảm bảo nút giữ hình dạng tròn
                color: "black",
                //padding: 0, // Loại bỏ padding thừa
                //border: "1px solid #ccc", // Tùy chọn: thêm viền cho nút
              }}
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon sx={{ color: "#000" }} />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
