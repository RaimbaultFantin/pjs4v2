import React, { useContext, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import RightDetails from "./components/RightDetails";
import LeftActivities from "./components/LeftActivities";
import { ThemeContext } from "../../../../services/context/ThemeContext";
import { HeightContext } from "../../../../services/context/HeightContext";
import { CurrentTitlePageContext } from "../../../../services/context/CurrentTitlePageContext";
import { useParams } from "react-router-dom";
interface ContentProps {}
/**
 * Belong to Home
 */
export default function Team(props: ContentProps) {
  const themes = useContext(ThemeContext);

  const heights = useContext(HeightContext);

  const title = useContext(CurrentTitlePageContext);

  const useStyles = makeStyles({
    rightSide: {
      backgroundColor: themes.hightDark,
      borderLeft: `1pt solid ${themes.lightDark}`,
      height: heights.screenHeight - heights.navbar
    }
  });

  const classes = useStyles();

  let { idTeam } = useParams();

  useEffect(() => {
    title.setTitle(idTeam as string);
  }, [idTeam, title]);

  return (
    <Grid container>
      <Grid item xs={10}>
        <LeftActivities />
      </Grid>
      <Grid item xs={2} classes={{ root: classes.rightSide }}>
        <RightDetails />
      </Grid>
    </Grid>
  );
}
