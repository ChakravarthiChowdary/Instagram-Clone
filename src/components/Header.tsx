import React, { useCallback } from "react";
import "./Header.css";
import { Button, Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "./Modal";
import "./Signup.css";
import { useAppSelector } from "../store/store";
import { auth } from "../firebase";
import { CLEAR_ERROR } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector((state) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch({ type: CLEAR_ERROR });
  }, [dispatch]);

  return (
    <>
      <div className="Header">
        <Container className={classes.container}>
          <div className="Header_contents">
            <img
              src="./instagramlogo.png"
              alt="logo"
              className="signup__logo"
            />
            <Button onClick={user ? () => auth.signOut() : () => setOpen(true)}>
              {user ? "Sign out" : "Sign in"}
            </Button>
          </div>
        </Container>
      </div>
      <Modal open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
