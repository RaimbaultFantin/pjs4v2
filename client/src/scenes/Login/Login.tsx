import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { User } from "../../App";
import { UserContext } from "../../services/context/UserContext";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import history from "../../services/history/history";
import { ThemeContext } from "../../services/context/ThemeContext";
import { setSessionCookie } from "../../services/cookies/Session";
import axios from "axios";

export interface LoginProps {}

/**
 * Login belong to App
 */
export default function Login() {
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
        display: "flex"
      }
    },
    fullscreen: {
      height: "100vh",
      backgroundColor: themes.hightDark
    },
    input: {
      color: themes.white
    },
    title: {
      color: themes.white
    }
  }));

  const classes = useStyles();

  // setUser for set the new Client after login successfull
  const { setUser } = useContext(UserContext);

  const [errorEmail, setErrorEmail] = useState({
    display: false,
    message: ""
  });

  const [errorPassword, setErrorPassword] = useState({
    display: false,
    message: ""
  });

  const [currentEmail, setcurrentEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setcurrentEmail(e.currentTarget.value);
  };

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setCurrentPassword(e.currentTarget.value);
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorEmail({
      display: false,
      message: ""
    });
    setErrorPassword({
      display: false,
      message: ""
    });
    axios
      .post("/user/login", {
        mail: currentEmail,
        pass: currentPassword
      })
      .then(response => {
        console.log(response);
        history.push("/home");
      })
      .catch(error => {
        console.log(error);
        setErrorEmail({
          display: true,
          message: "wrong"
        });
        setErrorPassword({
          display: true,
          message: "wrong"
        });
      });
  };

  return (
    <div>
      <Grid
        className={classes.fullscreen}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1 className={classes.title}>
          <span role="img" aria-label="sheep">
            🏆 Sport Manager 🏆
          </span>
        </h1>
        <form
          className={classes.root}
          onSubmit={submitLogin}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={handleChangeEmail}
            className={classes.input}
            required={true}
            color="secondary"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.input
            }}
            value={currentEmail}
            id="standard-basic"
            label="Email adress"
            error={errorEmail.display}
            helperText={errorEmail.message}
          />
          <TextField
            onChange={handleChangePassword}
            required={true}
            color="secondary"
            InputLabelProps={{
              className: classes.input
            }}
            InputProps={{
              className: classes.input
            }}
            value={currentPassword}
            id="filled-basic"
            label="Password"
            type="password"
            error={errorPassword.display}
            helperText={errorPassword.message}
          />
          <Button color="secondary" type="submit" variant="outlined">
            Sign in
          </Button>
        </form>
      </Grid>
    </div>
  );
}
