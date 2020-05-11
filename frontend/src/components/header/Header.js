import { Grid, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";
const authPages = [
  { link: "/", title: "Home" },
  { link: "/encode", title: "Encode Image" },
  { link: "/decode", title: "Decode Image" },
  { link: "/about", title: "About" },
  { link: "/team", title: "Team" },
  // { link: "/create-user", title: "Create User" },
  // { link: "/log-in", title: "Log In" },
];
const unAuthPages = [
  { link: "/create-user", title: "Create User" },
  { link: "/log-in", title: "Log In" },
];
function Header(props) {
  let url = "api/logout";
  if (process.env.NODE_ENV === "production") {
    url = "https://llucas314.pythonanywhere.com/api/logout";
  }
  const [links, setLinks] = useState(authPages);
  const { isLoggedIn, setLogin } = useContext(UserContext);
  useEffect(() => {
    setLinks(unAuthPages);
    if (isLoggedIn) {
      setLinks(authPages);
    }
  }, [isLoggedIn]);
  const {
    location: { pathname },
  } = props;

  const getTitle = (path = "/") => {
    const match = links.find((element) => {
      return element.link === path;
    });
    return match?.title.toLowerCase();
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
            {links.map((page, i) => (
              <NavLink
                style={{ color: "inherit", textDecoration: "none" }}
                key={i}
                to={page.link}
              >
                {props.location.pathname === page.link ? (
                  <span style={{ color: "#307FE2" }}>
                    {page.title.toUpperCase()}
                  </span>
                ) : (
                  page.title.toUpperCase()
                )}
              </NavLink>
            ))}
            {isLoggedIn && (
              <NavLink
                to="/"
                style={{ color: "inherit", textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  axios(url)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                      setLogin(false);
                      props.history.push("/");
                    });
                }}
              >
                LOGOUT
              </NavLink>
            )}
          </Grid>
        )}
      </Grid>
    </header>
  );
}

export default withRouter(Header);
