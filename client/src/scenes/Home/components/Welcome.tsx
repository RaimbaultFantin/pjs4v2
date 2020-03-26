import React, { useContext } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import SimpleCard from "../../../components/WelcomeCard/WelcomeCard";
import { HeightContext } from "../../../services/context/HeightContext";

interface WelcomeProps {}

/**
 * Belong to Home
 */
export default function Welcome(props: WelcomeProps) {
  const heights = useContext(HeightContext);

  const useStyles = makeStyles({
    main: {
      height: heights.screenHeight - heights.navbar
    }
  });

  const classes = useStyles();
  return (
    <Grid
      className={classes.main}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h1" component="h2" gutterBottom>
        <SimpleCard />
      </Typography>
    </Grid>
  );
}
