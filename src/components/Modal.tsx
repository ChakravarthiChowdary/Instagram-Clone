import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SignUp from "./Signup";
import SignIn from "./SignIn";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface IProps {
  handleClose: () => void;
  open: boolean;
}

const AuthModal: React.FC<IProps> = ({ handleClose, open }) => {
  const classes = useStyles();
  const [mode, setMode] = useState<"signup" | "signin">("signin");

  const signInClicked = useCallback(() => {
    setMode("signin");
  }, []);

  const signUpClicked = useCallback(() => {
    setMode("signup");
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {mode === "signup" ? (
            <SignUp signInClicked={signInClicked} handleClose={handleClose} />
          ) : (
            <SignIn signUpClicked={signUpClicked} handleClose={handleClose} />
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
