import { useState } from "react";
import {
  Button,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Collapse,
} from "reactstrap";
const { Link } = require("react-router-dom");

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav>
          <NavItem>
            <Link to="/">
              <Button color="primary">Home</Button>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/users">
              <Button color="link">Check Users</Button>
            </Link>
          </NavItem>

          {props.tokenExist ? (
            <NavItem>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("token");
                  props.setTokenExist(false);
                }}
              >
                <Button color="danger">Logout</Button>
              </Link>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <Link to="/signup">
                  <Button color="link">Sign Up</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/signin">
                  <Button color="link">Sign In</Button>
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
