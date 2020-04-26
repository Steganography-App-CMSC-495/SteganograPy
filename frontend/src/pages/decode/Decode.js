import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { withPageContainer, UploadForm } from "../../components";

function Decode() {
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
          Upload a SteganograPy image that needs to be decoded
        </Typography>
      </Grid>
      <Grid item>
        <UploadForm url="api/decode"></UploadForm>
      </Grid>
    </Grid>
  );
}

export default withPageContainer(Decode);
