// Header.js

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const HeaderTitle = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: "#282c34", width: "100%" }}>
        <Typography
          variant="h6"
          component="div"
          style={{ flexGrow: 1, textAlign: "center" }}
        >
          Google Gemini Model
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTitle;
