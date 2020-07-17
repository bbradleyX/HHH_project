import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/child_care.png"
import { Dropdown, Navbar, Nav, NavDropdown, Button, NavItem } from "react-bootstrap";

// import logo from "insert logo png here";

function Header(props) {
    return (
        <>
        <Navbar className="header">
            <Navbar.Brand href="/">
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top profileImage"
                    alt="User Profile Image"
                />
                PalCheck
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                
                <Dropdown className="dash-drop">
                    <Dropdown.Toggle className="profile-drop" as="a">
                        <img
                            src={props.imageUrl}
                            width="30"
                            height="30"
                            className="d-inline-block align-top profile-image"
                            alt="User Profile Image"
                        />
                        <span className="profile-name">{props.name}</span>
                    </Dropdown.Toggle >
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