import React, { Dispatch, SetStateAction, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../../services/context/UserContext";
import EditDialog from "../EditDialog/EditDialog";

interface PlanningBarProps {
  setEvents: (events: any) => void; // typage param pas bon : any ?
}

export default function PlanningBar(props: PlanningBarProps) {
  const { setEvents } = props;

  const { user } = useContext(UserContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          {user.isCoach ? <EditDialog /> : <div />}

          <Typography variant="h6" color="inherit">
            Planning
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
