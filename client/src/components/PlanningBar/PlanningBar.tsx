import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

interface PlanningBarProps {
  edit: boolean;
}

export default function PlanningBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <QueryBuilderIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Planning
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
