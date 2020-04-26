import { Grid, Typography } from "@material-ui/core";
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
      <Grid item>
        <Typography variant="h4" color="primary">
          About
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withPageContainer(About);
