import {
  Grid,
  Link,
  styled,
  Typography,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import React from "react";
import { withPageContainer } from "../../components";

const LinkWrapper = styled(Link)({
  backgroundColor: "white",
  borderRadius: 5,
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 200,
});
function Team() {
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
          Team
        </Typography>
      </Grid>
      <Grid container item justify="center" alignItems="center" xs={10}>
        <Grid
          item
          container
          justify="center"
          xs={6}
          style={{ textAlign: "center" }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Checkout my GitHub!"
            placement="top"
          >
            <LinkWrapper
              href="https://github.com/Aeleck"
              target="_blank"
              rel="noopener"
            >
              <PersonPinIcon color="primary" style={{ fontSize: 75 }} />

              <Typography variant="body1">Adam Beck</Typography>
            </LinkWrapper>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={6}
          style={{ textAlign: "center" }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Checkout my GitHub!"
            placement="top"
          >
            <LinkWrapper
              href="https://github.com/xdresch"
              target="_blank"
              rel="noopener"
            >
              <PersonPinIcon color="primary" style={{ fontSize: 75 }} />

              <Typography variant="body1">Andrew Schaeffer</Typography>
            </LinkWrapper>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={6}
          style={{ textAlign: "center" }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Checkout my GitHub!"
            placement="top"
          >
            <LinkWrapper
              href="https://github.com/saram1995"
              target="_blank"
              rel="noopener"
            >
              <PersonPinIcon color="primary" style={{ fontSize: 75 }} />

              <Typography variant="body1">Sara McConnell</Typography>
            </LinkWrapper>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={6}
          style={{ textAlign: "center" }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Checkout my GitHub!"
            placement="top"
          >
            <LinkWrapper
              href="https://github.com/llucas314"
              target="_blank"
              rel="noopener"
            >
              <PersonPinIcon color="primary" style={{ fontSize: 75 }} />
              <Typography variant="body1">Lorenzo Lucas</Typography>
            </LinkWrapper>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withPageContainer(Team);
