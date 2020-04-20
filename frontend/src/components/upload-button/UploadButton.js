import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

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
    "&.Mui-disabled": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  },
}));

export default function UploadButton(props) {
  const classes = useStyles();
  const [isDisabled, toggleDisabled] = useState(true);

  useEffect(() => {
    toggleDisabled(props.isDisabled);
  }, [props.isDisabled]);
  return (
    <div className={classes.root}>
      <input
        accept="image/png, image/jpeg"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        disabled={isDisabled}
        onChange={props.handleFile}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          disabled={isDisabled}
          className={classes.button}
        >
          Upload
        </Button>
      </label>
    </div>
  );
}
