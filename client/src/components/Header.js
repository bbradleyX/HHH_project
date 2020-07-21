import React from "react";
import logo from "../image/child_care.png"
import { Dropdown, Navbar, Nav } from "react-bootstrap";

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
                    className="d-inline-block align-top"
                    alt="User Profile Image"
                />
                <span className="project-name">PAL CHECK</span>
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
                        <Dropdown.Item onClick={window.gapi.auth2.getAuthInstance().signOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
        
        <Navbar className="navbar">
            
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-center">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="/journal">Journal</Nav.Link>
                <Nav.Link href="/pals">Pals</Nav.Link>
                <Nav.Link href="#overview">Overview</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
        
    );
}

export default Header;