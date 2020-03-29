import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { AvatarGroup } from "@material-ui/lab";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core";

export default function GroupAvatars() {
  const useStyles = makeStyles({
    textColor: {
      color: "white",
      textAlign: "center"
    },
    main: {
      margin: "auto"
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.textColor}>
        <h1>PSG</h1>
      </div>
      <AvatarGroup>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Tooltip title="Foo • Bar • Baz">
          <Avatar>+3</Avatar>
        </Tooltip>
      </AvatarGroup>
    </div>
  );
}
