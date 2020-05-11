import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";

function Header(props) {
  const {
    location: { pathname },
  } = props;
  const pages = [
    { link: "/", title: "Home" },
    { link: "/encode", title: "Encode Image" },
    { link: "/decode", title: "Decode Image" },
    { link: "/about", title: "About" },
    { link: "/team", title: "Team" },
    { link: "/create-user", title: "Create User"},
    { link: "/log-in", title: "Log In"}
  ];
  const getTitle = (path) => {
    const match = pages.find((element) => {
      return element.link === path;
    });
    return match.title.toLowerCase();
  };

  return (
    <header style={{ height: "25vh" }}>
      <Grid container direction="column" alignItems="center">
        <Typography
          variant="h1"
          style={{ margin: 20, borderBottom: "5px solid" }}
        >
          {pathname === "/"
            ? "STEGANOGRAPY"
            : getTitle(props.location.pathname)}
        </Typography>
        {pathname !== "/" && (
          <Grid container item justify="space-evenly">
            {pages.map((page, i) => (
              <NavLink key={i} to={page.link}>
                {page.title.toUpperCase()}
              </NavLink>
            ))}
          </Grid>
        )}
      </Grid>
    </header>
  );
}

export default withRouter(Header);
