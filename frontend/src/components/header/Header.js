import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";

function Header(props) {
  const pages = [
    { link: "/", title: "Home" },
    { link: "/encode", title: "Encode" },
    { link: "/decode", title: "Decode" },
    { link: "/about", title: "About" },
    { link: "/team", title: "Team" },
  ];
  const getTitle = (path) => {
    const match = pages.find((element) => {
      console.log("element.link", element.link, path);
      return element.link === path;
    });
    return match.title.toLowerCase();
  };

  return (
    <header style={{ height: "25vh" }}>
      <Grid container direction="column" alignItems="center">
        <Typography
          variant="h1"
          style={{ margin: 20, borderBottom: "5px solid #000" }}
        >
          {props.location.pathname === "/"
            ? "STEGANOGRAPY"
            : getTitle(props.location.pathname)}
        </Typography>
        <Grid container item justify="space-evenly">
          {pages.map((page, i) => (
            <NavLink key={i} to={page.link}>
              {page.title}
            </NavLink>
          ))}
        </Grid>
      </Grid>
    </header>
  );
}

export default withRouter(Header);
