import React, { Dispatch, SetStateAction, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../services/context/UserContext";
import EditPlanningDialog from "../EditPlanningDialog/EditPlanningDialog";
import { makeStyles } from "@material-ui/core";
import { ThemeContext } from "../../services/context/ThemeContext";

interface PlanningBarProps {
  setEvents: (events: any) => void; // typage param pas bon : any ?
}

export default function PlanningBar(props: PlanningBarProps) {
  const themes = useContext(ThemeContext);
  const useStyles = makeStyles({
    root: {
      backgroundColor: themes.darkRed
    }
  });

  const classes = useStyles();

  const { setEvents } = props;

  const { user } = useContext(UserContext);

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar variant="dense">
          {true ? <EditPlanningDialog /> : <div />}
          <Typography variant="h6" color="inherit">
            Planning
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
