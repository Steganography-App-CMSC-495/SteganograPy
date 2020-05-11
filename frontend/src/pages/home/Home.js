import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { withPageContainer } from "../../components";
import { NavLink } from "react-router-dom";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import LockIcon from "@material-ui/icons/Lock";
import InfoIcon from "@material-ui/icons/Info";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
function Home() {
  const { isLoggedIn, setLogin } = useContext(UserContext);
  const loggedOutLinks = (
    <>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink to="/create-user">
          <Tooltip
            TransitionComponent={Zoom}
            title="Create a user account to save images"
            placement="top"
          >
            <AddBoxIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">Create Account</Typography>
        </NavLink>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink to="/log-in">
          <Tooltip
            TransitionComponent={Zoom}
            title="Log in to your account"
            placement="top"
          >
            <AccountBoxIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">Log In</Typography>
        </NavLink>
      </Grid>
    </>
  );
  const loggedInLinks = (
    <>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink to="/encode">
          <Tooltip
            TransitionComponent={Zoom}
            title="Encode an image with a hidden message"
            placement="top"
          >
            <LockIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">Encode</Typography>
        </NavLink>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink to="/decode">
          <Tooltip
            TransitionComponent={Zoom}
            title="Decode messages hidden within your image"
            placement="top"
          >
            <ImageSearchIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">Decode</Typography>
        </NavLink>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink to="/about">
          <Tooltip
            TransitionComponent={Zoom}
            title="Learn more about SteganograPy and the steganographic process"
            placement="top"
          >
            <InfoIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">About</Typography>
        </NavLink>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink to="/team">
          <Tooltip
            TransitionComponent={Zoom}
            title="Meet the creators of SteganograPy"
            placement="top"
          >
            <PeopleAltIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">Team</Typography>
        </NavLink>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <NavLink
          to="/"
          onClick={(e) => {
            e.preventDefault();
            axios("/logout")
              .then((res) => {
                console.log(res);
              })
              .catch((error) => console.log(error))
              .finally(() => {
                setLogin(false);
              });
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Logout of your account"
            placement="top"
          >
            <AccountBoxIcon color="primary" style={{ fontSize: 75 }} />
          </Tooltip>
          <Typography variant="body2">Logout</Typography>
        </NavLink>
      </Grid>
    </>
  );
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
          Welcome to SteganograPy!
        </Typography>
      </Grid>
      <Grid container item justify="center" alignItems="center" xs={10}>
        {isLoggedIn ? loggedInLinks : loggedOutLinks}
      </Grid>
    </Grid>
  );
}

export default withPageContainer(Home);
