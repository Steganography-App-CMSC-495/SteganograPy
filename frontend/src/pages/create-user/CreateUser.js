import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { withPageContainer, UserForm } from "../../components";

function CreateUser() {
  let url = "api/createuser";

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
          Enter a username and password to sign up
        </Typography>
      </Grid>
      <Grid item>
        <UserForm hasText url={url}></UserForm>
      </Grid>
    </Grid>
  );
}

export default withPageContainer(CreateUser);
