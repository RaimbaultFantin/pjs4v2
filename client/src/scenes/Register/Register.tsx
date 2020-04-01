import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { ThemeContext } from "../../services/context/ThemeContext";
import {
  isEmail,
  areEqualPasswords,
  isPasswordStrongEnough,
  isNameLenghtValid
} from "../../services/utils/verifRegister";
import axios from "axios";
import history from "../../services/history/history";

interface InputState {
  value: string;
  display: boolean;
  error: string;
}

/**
 * Belong to App
 */
export default function Register() {
  const themes = useContext(ThemeContext);

  const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(3),
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

  /** Email */
  const [email, setEmail] = useState<InputState>({
    value: "",
    display: false,
    error: ""
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedEmail: InputState = Object.assign({}, email);
    updatedEmail.value = e.currentTarget.value.replace(/\s/g, "");
    setEmail(updatedEmail);
  };

  const handleBlurEmail = () => {
    const updatedEmail: InputState = Object.assign({}, email);
    try {
      if (isEmail(email.value)) {
        updatedEmail.display = false;
        updatedEmail.error = "";
      }
    } catch (e) {
      updatedEmail.display = true;
      updatedEmail.error = e.message;
    } finally {
      setEmail(updatedEmail);
    }
  };

  /** Family Name */
  const [familyName, setFamilyName] = useState<InputState>({
    value: "",
    display: false,
    error: ""
  });

  const handleChangeFamilyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedFamilyName: InputState = Object.assign({}, familyName);
    updatedFamilyName.value = e.currentTarget.value.replace(/\s/g, "");
    setFamilyName(updatedFamilyName);
  };

  const handleBlurFamilyName = () => {
    const updatedFamilyName: InputState = Object.assign({}, familyName);
    try {
      if (isNameLenghtValid(firstName.value)) {
        updatedFamilyName.error = "";
        updatedFamilyName.display = false;
      }
    } catch (e) {
      updatedFamilyName.error = e.message;
      updatedFamilyName.display = true;
    } finally {
      setFamilyName(updatedFamilyName);
    }
  };

  /** First Name */
  const [firstName, setFirstName] = useState<InputState>({
    value: "",
    display: false,
    error: ""
  });

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedFirstName: InputState = Object.assign({}, firstName);
    updatedFirstName.value = e.currentTarget.value.replace(/\s/g, "");
    setFirstName(updatedFirstName);
  };

  const handleBlurFirstName = () => {
    const updatedFirstName: InputState = Object.assign({}, firstName);
    try {
      if (isNameLenghtValid(firstName.value)) {
        updatedFirstName.error = "";
        updatedFirstName.display = false;
      }
    } catch (e) {
      updatedFirstName.error = e.message;
      updatedFirstName.display = true;
    } finally {
      setFirstName(updatedFirstName);
    }
  };

  /** Password */
  const [password, setPassword] = useState<InputState>({
    value: "",
    display: false,
    error: ""
  });

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedPassword: InputState = Object.assign({}, password);
    updatedPassword.value = e.currentTarget.value;
    setPassword(updatedPassword);
  };

  const handleBlurPassword = () => {
    const updatedPassword: InputState = Object.assign({}, password);
    try {
      if (isPasswordStrongEnough(password.value)) {
        updatedPassword.error = "";
        updatedPassword.display = false;
      }
    } catch (e) {
      updatedPassword.error = e.message;
      updatedPassword.display = true;
    } finally {
      setPassword(updatedPassword);
    }
  };

  /**Confirm password */
  const [confirmPassword, setConfirmPassword] = useState<InputState>({
    value: "",
    display: false,
    error: ""
  });

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const updatedConfirmPassword: InputState = Object.assign(
      {},
      confirmPassword
    );
    updatedConfirmPassword.value = e.currentTarget.value;
    setConfirmPassword(updatedConfirmPassword);
  };

  const handleBlurConfirmPassword = () => {
    const updatedPassword: InputState = Object.assign({}, password);
    const updatedConfirmPassword: InputState = Object.assign(
      {},
      confirmPassword
    );
    try {
      if (areEqualPasswords(password.value, confirmPassword.value)) {
        updatedPassword.error = "";
        updatedPassword.display = false;
        updatedConfirmPassword.error = "";
        updatedConfirmPassword.display = false;
      }
    } catch (e) {
      updatedPassword.error = e.message;
      updatedPassword.display = true;
      updatedConfirmPassword.error = e.message;
      updatedConfirmPassword.display = true;
    } finally {
      setPassword(updatedPassword);
      setConfirmPassword(updatedConfirmPassword);
    }
  };

  const [submit, setSubmit] = useState<boolean>(true);

  // for each state modified, set submit button to false (able)
  // if all condition are validated
  useEffect(() => {
    try {
      if (
        isEmail(email.value) &&
        isPasswordStrongEnough(password.value) &&
        areEqualPasswords(password.value, confirmPassword.value)
      )
        setSubmit(false);
    } catch (e) {
      setSubmit(true);
    }
  }, [email, familyName, firstName, password, confirmPassword]);

  // replace by await axios ...
  const submitLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post("/user/inscription", {
        mail: email.value,
        pass: password.value,
        nom: familyName.value,
        prenom: firstName.value
      })
      .then(response => {
        console.log(response);
        history.push("/home");
      })
      .catch(error => {
        console.log(error);
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
            🏆 Register 🏆
          </span>
        </h1>
        <form
          className={classes.root}
          onSubmit={submitLogin}
          noValidate
          autoComplete="off"
        >
          {/** Email */}
          <TextField
            onChange={handleChangeEmail}
            onBlur={handleBlurEmail}
            className={classes.input}
            required={true}
            color="secondary"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.input
            }}
            value={email.value}
            error={email.display}
            helperText={email.error}
            id="email"
            label="Email adress"
          />
          {/** FamilyName */}
          <TextField
            onChange={handleChangeFamilyName}
            className={classes.input}
            onBlur={handleBlurFamilyName}
            required={true}
            color="secondary"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.input
            }}
            value={familyName.value}
            error={familyName.display}
            helperText={familyName.error}
            id="familyname"
            label="Family Name"
          />
          {/** FirstName */}
          <TextField
            onChange={handleChangeFirstName}
            className={classes.input}
            onBlur={handleBlurFirstName}
            required={true}
            color="secondary"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.input
            }}
            value={firstName.value}
            error={firstName.display}
            helperText={firstName.error}
            id="firstname"
            label="First Name"
          />
          {/** Password */}
          <TextField
            onChange={handleChangePassword}
            onBlur={handleBlurPassword}
            required={true}
            color="secondary"
            InputLabelProps={{
              className: classes.input
            }}
            InputProps={{
              className: classes.input
            }}
            value={password.value}
            error={password.display}
            helperText={password.error}
            id="password"
            label="Password"
            type="password"
          />
          {/** ConfirmPassword */}
          <TextField
            onChange={handleChangeConfirmPassword}
            onBlur={handleBlurConfirmPassword}
            required={true}
            color="secondary"
            InputLabelProps={{
              className: classes.input
            }}
            InputProps={{
              className: classes.input
            }}
            value={confirmPassword.value}
            error={confirmPassword.display}
            helperText={confirmPassword.error}
            id="confirmpassword"
            label="Confirm Password"
            type="password"
          />
          {/** Submit */}
          <Button
            disabled={submit}
            color="secondary"
            type="submit"
            variant="outlined"
          >
            Register
          </Button>
        </form>
      </Grid>
    </div>
  );
}
