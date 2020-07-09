import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Navbar, Nav, NavDropdown, Button, NavItem } from "react-bootstrap";

// import logo from "insert logo png here";

function Header(props) {
    return (
        <Navbar>
            <Navbar.Brand href="/">PalChecker</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Dropdown>
                    <Dropdown.Toggle as="a">
                        {props.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={window.gapi.auth2.getAuthInstance().signOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;