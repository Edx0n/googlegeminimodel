import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <AppBar
      position="static"
      style={{ top: "auto", bottom: 0, position: "fixed" }}
    >
      <Toolbar style={{ backgroundColor: "#282c34" }}>
        <Typography
          variant="h6"
          component="div"
          style={{ flexGrow: 1, textAlign: "center" }}
        ></Typography>
        <Typography
          variant="body2"
          style={{ color: "white", marginRight: "10px", marginTop: "8px" }}
        >
          Created by <span className="hoverText">Edson Cabral</span>
        </Typography>
        <IconButton
          color="inherit"
          href="https://github.com/Edx0n"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
