import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { withPageContainer, UserForm } from "../../components";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";
function CreateUser() {
  let url = "api/createuser";
  const { isLoggedIn, setLogin } = useContext(UserContext);
  return (
    <>
      {!isLoggedIn ? (
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
            <UserForm url={url}></UserForm>
          </Grid>
        </Grid>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default withPageContainer(CreateUser);
