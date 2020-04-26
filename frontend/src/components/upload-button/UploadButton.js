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

export default function UploadButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/png, image/jpeg"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.handleFile}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
        >
          Upload
        </Button>
      </label>
    </div>
  );
}
