import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { withPageContainer, UploadForm } from "../../components";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";

function Decode() {
  const { isLoggedIn, setLogin } = useContext(UserContext);
  let url = "api/decode";
  if (process.env.NODE_ENV === "production") {
    url = "https://llucas314.pythonanywhere.com/api/decode";
  }
  return (
    <>
      {isLoggedIn ? (
        <Grid
          container
          item
          justify="space-evenly"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h4" color="primary">
              Upload a SteganograPy image that needs to be decoded
            </Typography>
          </Grid>
          <Grid item>
            <UploadForm url={url}></UploadForm>
          </Grid>
        </Grid>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default withPageContainer(Decode);
