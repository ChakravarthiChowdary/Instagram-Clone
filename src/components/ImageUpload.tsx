import { Button } from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase";
import { createStyles, withStyles, Theme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { storage, db } from "../firebase";
import { useAppSelector } from "../store/store";
import "./ImageUpload.css";

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress);

const ImageUpload = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [progress, setProgress] = useState(0);
  const user = useAppSelector((state) => state.user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handleUpload = () => {
    let uploadTask;
    if (image) uploadTask = storage.ref(`images/${image.name}`).put(image);
    if (uploadTask) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          if (image) {
            storage
              .ref("images")
              .child(image?.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("posts").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  imageURL: url,
                  username: user?.displayName,
                });
                setCaption("");
                setImage(null);
                setProgress(0);
              });
          }
        }
      );
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <Paper className="Imageupload">
      <BorderLinearProgress variant="determinate" value={50} />

      <TextField
        variant="outlined"
        margin="normal"
        required
        id="caption"
        label="Caption"
        name="caption"
        autoFocus
        onChange={handleChange}
        size="small"
      />
      <input type="file" onChange={handleSelect} />
      <Button
        onClick={handleUpload}
        variant="contained"
        color="primary"
        size="small"
      >
        Upload
      </Button>
    </Paper>
  );
};

export default ImageUpload;
