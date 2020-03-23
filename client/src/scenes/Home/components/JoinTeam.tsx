import React, { useContext, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { HeightContext } from "../../../services/context/HeightContext";
import { ThemeContext } from "../../../services/context/ThemeContext";
import { CurrentTitlePageContext } from "../../../services/context/CurrentTitlePageContext";

interface JoinTeamProps {}

/**
 * Belong to Home
 */
export default function JoinTeam(props: JoinTeamProps) {
  const themes = useContext(ThemeContext);
  const heights = useContext(HeightContext);
  const useStyles = makeStyles({
    title: {
      color: themes.lightDark
    },
    main: {
      height: heights.screenHeight - heights.navbar
    }
  });

  const classes = useStyles();

  const title = useContext(CurrentTitlePageContext);

  useEffect(() => {
    title.setTitle("Join a Team");
  });

  return (
    <Grid
      className={classes.main}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1 className={classes.title}>
        <span role="img" aria-label="sheep">
          no invitation ...
        </span>
      </h1>
    </Grid>
  );
}
