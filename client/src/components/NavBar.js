import { useEffect, useState } from "react";

const { Link } = require("react-router-dom");

const NavBar = (props) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/users">Check Users</Link>
      {props.tokenExist ? (
        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem("token");
            props.setTokenExist(false);
          }}
        >
          Logout
        </Link>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
