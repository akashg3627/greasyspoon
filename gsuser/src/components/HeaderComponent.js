import React, { Component, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';


function HeaderComponent(props) {
    const [isNavOpen, toggleNavbar] = useState(false);
    return (
        <React.Fragment>
            <Navbar light expand="md" >
                <div className="container c-h">
                    <NavbarBrand href="/">
                        <span className="g">GREASY</span><span className="s">SPOON</span>
                    </NavbarBrand>
                    <NavbarToggler className="ml-auto" onClick={() => toggleNavbar(!isNavOpen)} />
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    Home
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    About Us
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    Menu
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    Contact Us
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-search fa-lg"></span>
                                </NavLink>
                            </NavItem>
                            <Link to="/login">
                            <Button className="nav-link btn-login">
                                <span className="fa fa-bars fa-lg"></span>
                            </Button>
                            </Link>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </React.Fragment>
    );
}

export default HeaderComponent;