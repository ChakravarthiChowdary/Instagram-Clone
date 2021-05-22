import React, { useCallback } from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Modal from "./Modal";
import "./Signup.css";
import { useAppSelector } from "../store/store";
import { auth } from "../firebase";
import { CLEAR_ERROR } from "../store/actions";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch({ type: CLEAR_ERROR });
  }, [dispatch]);

  return (
    <>
      <div className="Header">
        <img src="./instagramlogo.png" alt="logo" className="signup__logo" />
        <Button onClick={user ? () => auth.signOut() : () => setOpen(true)}>
          {user ? "Sign out" : "Sign in"}
        </Button>
      </div>
      <Modal open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
