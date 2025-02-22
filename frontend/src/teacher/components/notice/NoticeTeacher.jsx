import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../../../environment";

export default function NoticeTeacher() {
  const [notices, setNotices] = useState([]);

  const fetchAllNotices = () => {
    axios
      .get(`${baseApi}/notice/teacher`)
      .then((resp) => {
        console.log("Notice", resp);
        setNotices(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching all Notices", e);
      });
  };

  useEffect(() => {
    fetchAllNotices();
  }, []);
  return (
    <>
      <h1>Notice</h1>

      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {notices &&
          notices.map((x) => {
            return (
              <Paper key={x._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h6">
                    <b>Title: </b>
                    {x.title}
                  </Typography>
                  <Typography variant="h6">
                    <b>Message: </b>
                    {x.message}
                  </Typography>
                  <Typography variant="h6">
                    <b>Audience: </b>
                    {x.audience}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
      </Box>
    </>
  );
}
