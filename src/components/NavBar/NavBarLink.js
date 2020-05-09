// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link, useHistory } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavBarLink = ({path, icon}) => {
  console.log(path);
  let history = useHistory()
  console.log(history);


  
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Link  to={path} className={styles.NavLinkContainer}>
      <div  className={`${styles.NavLinkBackground} ${(path == history.location.pathname) ? styles.active : ""}`}></div>
      <FontAwesomeIcon icon={icon}  color="white" style={{fontSize: "20px"}}/>
    </Link>
  );
};

export default NavBarLink;