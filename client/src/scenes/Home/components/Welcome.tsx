import React, { useContext } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import WelcomeCard from "../../../components/WelcomeCard/WelcomeCard";
import { HeightContext } from "../../../services/context/HeightContext";
import { UserContext } from "../../../services/context/UserContext";

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

  const { user } = useContext(UserContext);
  return (
    <Grid
      className={classes.main}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h1" component="h2" gutterBottom>
        <WelcomeCard userName={user?.firstname} />
      </Typography>
    </Grid>
  );
}
