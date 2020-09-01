import React, { Component, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import LoginButton from './LoginButton';


function HeaderComponent(props) {
    const [isNavOpen, toggleNavbar] = useState(false);
    const [loginmodal, toggleLogin] = useState(false);
    return (
        <React.Fragment>
            <Navbar light expand="lg" >
                <div className="container c-h">
                    <NavbarBrand href="/">
                        <span className="g">GREASY</span><span className="s">SPOON</span>
                    </NavbarBrand>
                    <NavbarToggler className="ml-auto float-left" onClick={() => toggleNavbar(!isNavOpen)} />
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
                                <NavLink className="nav-link" to="/order">
                                    Order
                            </NavLink>
                            
                            </NavItem>
                            </Nav>
                    </Collapse>
                            {props.user != null
                                ?
                                <NavbarBrand>
                                    <NavLink className="nav-link user-info" to="/profile">
                                        <span className="fa fa-user fa-lg"></span> <span className="text-capitalize"> {props.user.name}</span>
                                    </NavLink>
                                </NavbarBrand>
                                : null
                            }
                            
                            <LoginButton user={props.user} signin={props.signin} signup={props.signup} logout={props.logout}/>
                </div>
            </Navbar>
        </React.Fragment>
    );
}

export default HeaderComponent;