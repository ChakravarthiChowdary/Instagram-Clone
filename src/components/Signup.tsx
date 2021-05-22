import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import "./Signup.css";

import Copyright from "./Copyright";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { CLEAR_ERROR, SET_ERROR } from "../store/actions";
import { useAppSelector } from "../store/store";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface IProps {
  signInClicked: () => void;
  handleClose: () => void;
}

const SignUp: React.FC<IProps> = ({ signInClicked, handleClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { authError, user } = useAppSelector((state) => state);

  const signUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => user.user?.updateProfile({ displayName: username }))
      .catch((error) => dispatch({ type: SET_ERROR, payload: error.message }));
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user, handleClose]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="./instagramlogo.png" alt="logo" className="signup__logo" />

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="userName"
                autoComplete="uname"
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (authError) dispatch({ type: CLEAR_ERROR });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (authError) dispatch({ type: CLEAR_ERROR });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) dispatch({ type: CLEAR_ERROR });
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => signUp(e)}
          >
            Sign Up
          </Button>
          {authError && <p className="signup__error">{authError}</p>}
          <Grid container justify="flex-end">
            <Grid item>
              <Button size="small" onClick={signInClicked}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
