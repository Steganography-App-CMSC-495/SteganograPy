import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: 10,
  },
}));

export default function UserButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
        type="text"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
        >
          Submit
        </Button>
      </label>
    </div>
  );
}
