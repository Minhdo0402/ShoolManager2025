/* eslint-disable react/prop-types */
//import * as React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

export default function MessageSnackbar({ message, messageType, handleClose }) {
  return (
    <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={messageType} // "success" or "error" determines color
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
