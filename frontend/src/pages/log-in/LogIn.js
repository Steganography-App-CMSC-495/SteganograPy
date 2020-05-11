import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { withPageContainer, UserForm } from "../../components";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";
function LogIn() {
  let url = "api/login";
  const { isLoggedIn, setLogin } = useContext(UserContext);
  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
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
          <UserForm login url={url}></UserForm>
        </Grid>
      </Grid>
    );
  }
}

export default withPageContainer(LogIn);
