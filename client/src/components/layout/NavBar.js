import React, { useState } from "react";
import "./style.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Link to={"/"}>Home</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to={"/classroom"}>ClassRoom</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={"/teachers"}>Teachers</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={"/subjects"}>Subjects</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
