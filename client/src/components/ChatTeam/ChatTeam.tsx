import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Icon } from "@material-ui/core";
import { ThemeContext } from "../../services/context/ThemeContext";
import { HeightContext } from "../../services/context/HeightContext";
interface ChatTeamProps {}


export default function ChatTeam() {
  const themes = useContext(ThemeContext);

  const heights = useContext(HeightContext);

  const useStyles = makeStyles({
    main: {
      height: heights.screenHeight - (heights.navbar + heights.bottomnav)
    },
    input: {
      color: themes.white
    },
    form: {
      width: "100%",
      display: "flex",
      alignItems: "center"
    },
    test: {
      textAlign: "center"
    }
  });

  const classes = useStyles();
  return (
    <Grid
      className={classes.main}
      container
      direction="column"
      justify="flex-end"
      alignItems="center"
    >
      <form className={classes.form}>
        <Grid xs={11} item>
          <TextField
            id="filled-full-width"
            placeholder="Send a message to your team"
            fullWidth
            margin="normal"
            label="🏆"
            color="secondary"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              className: classes.input
            }}
            variant="filled"
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={1} classes={{ root: classes.test }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
