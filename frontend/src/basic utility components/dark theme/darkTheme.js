import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Sửa "model" thành "mode"
    primary: {
      main: "#1E90FF",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#000000", // Màu nền chính khi dark mode
      paper: "#121212", // Màu nền của các thành phần (ví dụ: Card, Modal)
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
        h1: {
          fontSize: "2rem",
          fontWeight: 700,
          color: "#FFFFFF",
        },
        body1: {
          fontSize: "1rem",
          color: "#FFFFFF",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#222222", // Màu nền input tối hơn
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666666",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFFFFF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1E90FF",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#CCCCCC",
          "&.Mui-focused": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#333333", // Nền nút bấm tối hơn
          "&:hover": {
            backgroundColor: "#444444",
          },
          "&:active": {
            backgroundColor: "#000000", // Khi nhấn, đổi sang màu đen
          },
        },
      },
    },
  },
});

export default darkTheme;
