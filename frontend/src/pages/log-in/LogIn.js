import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { withPageContainer, UserForm } from "../../components";

function LogIn() {
  let url = "api/login";
  if (process.env.NODE_ENV === "production") {
    url = "https://llucas314.pythonanywhere.com/api/encode";
  }
  return (
    <Grid
      container
      item
      justify="space-evenly"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Typography variant="h4" color="primary">
          Enter your username and password to log in
        </Typography>
      </Grid>
      <Grid item>
        <UserForm hasText url={url}></UserForm>
      </Grid>
    </Grid>
  );
}

export default withPageContainer(LogIn);
