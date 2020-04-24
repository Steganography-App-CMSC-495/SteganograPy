import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import ImagePreview from "../img-preview/ImagePreview";
import UploadButton from "../upload-button/UploadButton";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      backgroundColor: "#FFF",
    },
  },
}));

export default function UploadForm() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [isDisabled, toggleDisabled] = useState(true);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    let formData = new FormData();
    formData.append("message", value);
    formData.append("upload", file, "fileName");
    console.log("formData", formData);
    axios.post("api/encode", formData).then((res) => {
      setStatus("Successfully Submitted");
    });
    axios.get("/message").then((res) => {
      console.log("res.message", res);
    });
  };
  const handleFile = (e) => {
    setLoading(true);
    setImage(null);
    let reader = new FileReader();
    let targetFile = e.target.files[0];
    if (targetFile) {
      reader.onloadend = () => {
        setFile(targetFile);
        setImage(reader.result);
      };
      setLoading(false);
      reader.readAsDataURL(targetFile);
    }
  };
  const handleChange = (event) => {
    const message = event.target.value;
    setValue(message);
    if (message.length > 0) {
      toggleDisabled(false);
    } else {
      toggleDisabled(true);
    }
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container direction="column" alignItems="center" xs={12}>
        <Typography variant="h3">{status}</Typography>
        <Grid item xs={7} sm={12}>
          <ImagePreview file={imagePreviewUrl} loading={isLoading} />
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
        {!isLoading && (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Grid>
    </form>
  );
}
