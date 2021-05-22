import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";

import Modal from "./Modal";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="Header">
        <img
          src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
          className="Header__image"
          alt="instagram logo"
        />
        <Button onClick={() => setOpen(true)}>Sign up</Button>
      </div>
      <Modal open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
