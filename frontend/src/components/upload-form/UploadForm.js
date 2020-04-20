import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import UploadButton from "../upload-button/UploadButton";
import { Grid } from "@material-ui/core";
import ImagePreview from "../img-preview/ImagePreview";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      backgroundColor: "#FFF",
    },
  },
}));

export default function UploadForm() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [isDisabled, toggleDisabled] = useState(true);
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };
  const handleFile = (e) => {
    console.log("handle file");
    setFile(URL.createObjectURL(e.target.files[0]));
    setLoading(false);
  };
  const handleChange = (event) => {
    const message = event.target.value;
    setValue(message);
    if (message.length > 2) {
      toggleDisabled(false);
    } else {
      toggleDisabled(true);
    }
  };

  return (
    <Grid item xs={12}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <ImagePreview file={file} loading={isLoading} />
          <TextField
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            placeholder="Enter a message to encrypt"
            variant="filled"
            onChange={handleChange}
            className={classes.input}
          />
        </Grid>
        <UploadButton isDisabled={isDisabled} handleFile={handleFile} />
      </form>
    </Grid>
  );
}
