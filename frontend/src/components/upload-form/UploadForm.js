import { Button, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { saveAs } from "file-saver";
import {
  DownloadModal,
  MessageModal,
  ImagePreview,
  SimpleBackdrop,
  UploadButton,
} from "../index";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [blob, setBlob] = useState(null);
  const [decodeMessage, setDecodeMessage] = useState("");
  const handleDownload = () => {
    const fileName = file.name.split(".");
    saveAs(blob, `${fileName[0]}.png`);
    modalClose();
    setBlob(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setBackdrop(true);
    let formData = new FormData();
    formData.append("message", value);
    formData.append("image", file, "fileName");
    {
      props.hasText
        ? axios({
            method: "post",
            url: props.url,
            data: formData,
            responseType: "blob",
          })
            .then((res) => {
              setBlob(res.data);
              setStatus("Successfully Submitted");
              setSeverity("success");
              setModalOpen(true);
            })
            .catch((error) => {
              setStatus("There was an error encoding your photo");
              setSeverity("error");
            })
            .finally(() => {
              setOpen(true);
              setBackdrop(false);
            })
        : axios
            .post(props.url, formData)
            .then((res) => {
              setDecodeMessage(res.data.message);
              setModalOpen(true);
            })
            .catch((error) => {
              setStatus(error.response.data.message);
              setSeverity("error");
              setOpen(true);
            })
            .finally(() => {
              setBackdrop(false);
            });
    }
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
  const modalClose = () => {
    setModalOpen(false);
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
      {modalOpen &&
        (props.hasText ? (
          <DownloadModal
            handleClose={modalClose}
            handleDownload={handleDownload}
          ></DownloadModal>
        ) : (
          <MessageModal
            handleClose={modalClose}
            message={decodeMessage}
          ></MessageModal>
        ))}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {status}
        </Alert>
      </Snackbar>
    </>
  );
}
export default withRouter(UploadForm);
