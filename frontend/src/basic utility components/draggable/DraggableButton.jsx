import { Button } from "@mui/material";
import Draggable from "react-draggable";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function DraggableButton() {
  const { dark, modeChange } = useContext(AuthContext);

  return (
    <>
      <Draggable>
        <Button
          sx={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "transparent",
            zIndex: "999990889",
            display: "flex",
          }}
          onClick={modeChange}
        >
          {dark ? (
            <DarkModeIcon sx={{ color: "black" }} />
          ) : (
            <LightModeIcon sx={{ color: "#fff" }} />
          )}
        </Button>
      </Draggable>
    </>
  );
}
