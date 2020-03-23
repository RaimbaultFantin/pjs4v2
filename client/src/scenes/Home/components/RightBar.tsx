import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SimpleDialog from "../../../components/SimpleDialogButton/SimpleDialog";
import { deepOrange } from "@material-ui/core/colors";
import { ThemeContext } from "../../../services/context/ThemeContext";
import { CurrentTitlePageContext } from "../../../services/context/CurrentTitlePageContext";

/**
 * RightBar belong to Home
 */
export default function RightBar() {
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
        backgroundColor: themes.hightDark
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
      }
    })
  );

  const classes = useStyles();

  const title = useContext(CurrentTitlePageContext);

  return (
    <AppBar classes={{ root: classes.theme }} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title.title}
          <span role="img" aria-label="sheep">
            🥇
          </span>
        </Typography>
        <SimpleDialog />
      </Toolbar>
    </AppBar>
  );
}
