import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DownloadModal(props) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={() => props.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"It's done!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your encoded picture is available for download!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => props.handleDownload()}
            color="primary"
            autoFocus
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
