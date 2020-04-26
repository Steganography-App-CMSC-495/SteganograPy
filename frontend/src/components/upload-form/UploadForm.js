import { Button, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ImagePreview from "../img-preview/ImagePreview";
import UploadButton from "../upload-button/UploadButton";
import SimpleBackdrop from "../backdrop/Backdrop";
import { withRouter } from "react-router-dom";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      backgroundColor: "#FFF",
    },
  },
}));

function UploadForm(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isDisabled, toggleDisabled] = useState(true);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setBackdrop(true);
    let formData = new FormData();
    formData.append("message", value);
    formData.append("upload", file, "fileName");
    axios
      .post(props.url, formData)
      .then(() => {
        setBackdrop(false);
        setStatus("Successfully Submitted");
        setSeverity("success");
        setOpen(true);
      })
      .catch((error) => {
        setBackdrop(false);
        setStatus("Error", error?.response);
        setSeverity("error");
        setOpen(true);
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (!props.hasText) {
      toggleDisabled(false);
    }
  }, [props]);

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item xs={7} sm={12}>
            <ImagePreview file={imagePreviewUrl} loading={isLoading} />
            {props.hasText && (
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
            )}
          </Grid>
          <UploadButton isDisabled={isDisabled} handleFile={handleFile} />
          {!isLoading && !isDisabled && (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Grid>
      </form>
      <SimpleBackdrop open={backdrop} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {status}
        </Alert>
      </Snackbar>
    </>
  );
}
export default withRouter(UploadForm);
