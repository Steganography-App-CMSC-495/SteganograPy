import { Grid, withTheme } from "@material-ui/core";
import React from "react";
const PageContainer = (BaseComponent) => (RouteComponentProps) => {
  return (
    <Grid
      container
      justify="center"
      style={{
        backgroundColor: "#212020",
        height: "75vh",
      }}
    >
      <BaseComponent {...RouteComponentProps} />
    </Grid>
  );
};

export default (BaseComponent) => withTheme(PageContainer(BaseComponent));
