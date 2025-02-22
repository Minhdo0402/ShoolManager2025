import { createTheme } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  components: {
    MuiTypography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
      },
      body1: {
        fontSize: "1rem",
        color: "#333",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#333333",
          "& .MuiOutlinedInput-notchedOutline": {
            BorderColor: "#CCCCCC",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            BorderColor: "#1976D2",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            BorderColor: "#1976D2",
          },
        },
      },
    },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                color: '#666666',
                '&.Mui-focused': {
                    color:'#1976D2'
                }
            }
        }
    }
  },
});

export default lightTheme;
