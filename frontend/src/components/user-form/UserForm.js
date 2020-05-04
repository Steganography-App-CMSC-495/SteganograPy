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

function UserForm(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isDisabled, toggleDisabled] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [blob, setBlob] = useState(null);
  const handleDownload = () => {
    saveAs(blob);
    modalClose();
    setBlob(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setBackdrop(true);
    let formData = new FormData();
    formData.append("message", value);
    formData.append("message", value);
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
              setStatus("There was an error");
              setSeverity("error");
            })
            .finally(() => {
              setOpen(true);
              setBackdrop(false);
            })
        : axios
            .post(props.url, formData)
            .then((res) => {
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
            {props.hasText && (
              <TextField
                id="filled-multiline-static"
                label="Message"
                variant="filled"
                onChange={handleChange}
                className={classes.input}
              />
            )}
          </Grid>
          <UploadButton isDisabled={isDisabled} handleSubmit={handleSubmit} />
        </Grid>
      </form>
      <SimpleBackdrop open={backdrop} />
      {modalOpen &&
        (props.hasText ? (
          <DownloadModal
            handleClose={modalClose}
          ></DownloadModal>
        ) : (
          <MessageModal
            handleClose={modalClose}
          ></MessageModal>
        ))}
    </>
  );
}
export default withRouter(UserForm);
