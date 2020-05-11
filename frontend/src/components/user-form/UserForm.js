import { Button, Grid, Input } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { LoginModal, SimpleBackdrop } from "../index";
import { UserContext } from "../../UserContext";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const { isLoggedIn, setLogin } = useContext(UserContext);
  const handleSubmit = (event) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios({
      method: "post",
      url: props.url,
      data: formData,
      response: "text",
    })
      .then((res) => {
        setStatus("Successfully Submitted");
        setSeverity("success");
        setModalOpen(true);
        setLogin(true);
      })
      .catch((error) => {
        setStatus(error.response.data.message);
        setSeverity("error");
      })
      .finally(() => {
        setOpen(true);
        setBackdrop(false);
      });
  };

  const handleUserChange = (event) => {
    const message = event.target.value;
    setUsername(message);
  };
  const handlePasswordChange = (event) => {
    const message = event.target.value;
    setPassword(message);
  };
  const modalClose = () => {
    setModalOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={7} sm={12}>
            <div>
              <TextField
                required
                id="username"
                label="Username"
                variant="filled"
                onChange={handleUserChange}
                className={classes.input}
              />
              <TextField
                type="password"
                id="password"
                label="Password"
                variant="filled"
                onChange={handlePasswordChange}
                className={classes.input}
              />
            </div>
          </Grid>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </form>
      <SimpleBackdrop open={backdrop} />
      {modalOpen &&
        (props.login ? (
          <LoginModal
            handleClose={modalClose}
            message={"Successfully Logged In"}
          ></LoginModal>
        ) : (
          <LoginModal
            handleClose={modalClose}
            message={"Account Successfully Created"}
          ></LoginModal>
        ))}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {status}
        </Alert>
      </Snackbar>
    </>
  );
}
export default withRouter(UserForm);
