import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { User } from "../../App";
import {
  setSessionCookie,
  UserContext
} from "../../services/context/UserContext";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import history from "../../services/history/history";
import { ThemeContext } from "../../services/context/ThemeContext";

export interface LoginProps {
  bddContains: (email: string, mdp: string) => User | string;
}

/**
 * Login belong to App
 */
export default function Login(props: LoginProps) {
  const { bddContains } = props;

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setcurrentEmail(e.currentTarget.value);
  };

  const handlgeChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentPassword(e.currentTarget.value);
  };

  // replace by await axios ...
  const submitLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setErrorEmail({
      display: false,
      message: ""
    });
    setErrorPassword({
      display: false,
      message: ""
    });
    try {
      if (bddContains(currentEmail, currentPassword) instanceof User) {
        const user: User = bddContains(currentEmail, currentPassword) as User;
        setSessionCookie(user);
        setUser(user);
        history.push("/home");
      }
    } catch (e) {
      if (e.name === "WrongEmail")
        setErrorEmail({
          display: true,
          message: e.message
        });
      if (e.name === "WrongPassword")
        setErrorPassword({
          display: true,
          message: e.message
        });
    }
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
            onChange={handlgeChangePassword}
            required={true}
            color="secondary"
            InputLabelProps={{
              className: classes.input
            }}
            InputProps={{
              className: classes.input
            }}
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
