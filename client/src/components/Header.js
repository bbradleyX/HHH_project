import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Navbar, Nav, NavDropdown, Button, NavItem } from "react-bootstrap";

// import logo from "insert logo png here";

function Header(props) {
    return (
        <>
        <Navbar className="header">
            <Navbar.Brand href="/">PalCheck</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <img
                    src={props.imageUrl}
                    width="30"
                    height="30"
                    className="d-inline-block align-top profileImage"
                    alt="User Profile Image"
                />
                <Dropdown>
                    <Dropdown.Toggle as="a">
                        {props.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Item onClick="#profile">Profile</Dropdown.Item>
                        <Dropdown.Item onClick={window.gapi.auth2.getAuthInstance().signOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
        
        <Navbar className="navbar">
            
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-center">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="#journal">Journal</Nav.Link>
                <Nav.Link href="/pals">Pals</Nav.Link>
                <Nav.Link href="#overview">Overview</Nav.Link>
                <Nav.Link href="#shaker">Shaker</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
        
    );
}

export default Header;