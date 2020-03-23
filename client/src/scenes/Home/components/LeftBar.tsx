import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { deepOrange } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import { ThemeContext } from "../../../services/context/ThemeContext";

/**
 * LeftBar belong to Home
 */
export default function LeftBar() {
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        flexGrow: 1
      },
      theme: {
        backgroundColor: themes.hightDark,
        boxShadow: "none"
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
      }
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar classes={{ root: classes.theme }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tools
          </Typography>
          <Avatar className={classes.orange}>N</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
