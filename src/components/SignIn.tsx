import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "./Copyright";
import "./Signup.css";
import { useAppSelector } from "../store/store";
import { useDispatch } from "react-redux";
import { CLEAR_ERROR, SET_ERROR, SET_USER } from "../store/actions";
import { auth } from "../firebase";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface IProps {
  signUpClicked: () => void;
  handleClose: () => void;
}

const SignIn: React.FC<IProps> = ({ signUpClicked, handleClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, authError } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => dispatch({ type: SET_USER, payload: authUser }))
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
              if (authError) dispatch({ type: CLEAR_ERROR });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
          >
            Sign In
          </Button>
          {authError && <p className="signup__error">{authError}</p>}
          <Grid container justify="flex-end">
            <Grid item>
              <Button size="small" onClick={signUpClicked}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
