import React, { useContext, useEffect } from "react";
import {
  Grid,
  makeStyles,
  TextField,
  createStyles,
  Theme,
  MenuItem
} from "@material-ui/core";
import { HeightContext } from "../../../services/context/HeightContext";
import { ThemeContext } from "../../../services/context/ThemeContext";
import { CurrentTitlePageContext } from "../../../services/context/CurrentTitlePageContext";

interface CreateTeamProps {}

const sports = ["Soccer", "Basketball", "Rugby"];

/**
 * Belong to Home
 */
export default function CreateTeam(props: CreateTeamProps) {
  const heights = useContext(HeightContext);

  const themes = useContext(ThemeContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      main: {
        height: heights.screenHeight - heights.navbar
      },
      form: {
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${themes.darkRed}`,
        "& > *": {
          margin: theme.spacing(4)
        }
      },
      input: {
        color: themes.white
      },
      title: {
        color: themes.white
      }
    })
  );

  const classes = useStyles();

  const title = useContext(CurrentTitlePageContext);

  useEffect(() => {
    title.setTitle("Create a Team");
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
          🏀 Create your own team 🏈
        </span>
      </h1>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          InputLabelProps={{
            className: classes.input
          }}
          color="secondary"
          required={true}
          id="standard-basic"
          label="Team Name"
        />
        <TextField
          select
          InputLabelProps={{
            className: classes.input
          }}
          color="secondary"
          required={true}
          id="filled-basic"
          label="Sport"
          helperText="Select your sport category"
        >
          {sports.map(sport => (
            <MenuItem key={sport} value={sport}>
              {sport}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          InputLabelProps={{
            className: classes.input
          }}
          type="search"
          color="secondary"
          id="outlined-basic"
          label="Search Teammate"
        />
      </form>
    </Grid>
  );
}
