import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { withPageContainer } from "../../components";

function About() {
  return (
    <Grid
      container
      item
      justify="space-evenly"
      alignItems="center"
      direction="column"
    >
      <Paper
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "50%",
          padding: "30px 40px 35px 40px",
        }}
      >
        <Typography variant="h4" color="primary" style={{ marginBottom: 20 }}>
          About
        </Typography>
        <Typography variant="body1" style={{ textIndent: 30 }}>
          SteganograPy allows a user to upload an image, and enter a message to
          be hidden in that image. The app will generate a copy of the original
          picture with the encrypted message. The modifications to the encrypted
          picture should not be noticeable. The user can then send the encrypted
          image to someone. The receiver can then upload the modified image app.
          The app will display the decoded message.
        </Typography>
        <br />
        <Typography variant="body1" style={{ textIndent: 30 }}>
          SteganograPy is a python application that is built on the foundation
          of steganography. The practice of steganography is used in fields such
          as data encryption and espionage. This application provides users the
          ability to hide and reveal messages in photographs.
        </Typography>
      </Paper>
    </Grid>
  );
}

export default withPageContainer(About);
