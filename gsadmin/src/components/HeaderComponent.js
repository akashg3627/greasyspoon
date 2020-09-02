import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LoginButton from './LoginButton';


function HeaderComponent(props) {
    const [isNavOpen, toggleNavbar] = useState(false);
    const [loginmodal, toggleLogin] = useState(false);
    const [gsnavbar, setNavbar] = useState(false);

    const changeNavBg =()=>{
        if(window.scrollY >= 70)
        {
            setNavbar(true);
        }else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeNavBg);
    return (
        <React.Fragment>
            <Navbar fixed="top" expand="lg" className={gsnavbar+isNavOpen ? 'navbar-light gs-nav-active' : 'navbar-dark'} >
                <div className="container">
                    <NavbarBrand href="/">
                        <span className="g">GREASY</span><span className={gsnavbar ? "s-active": "s"}>SPOON</span>
                    </NavbarBrand>
                    <NavbarToggler className="ml-auto float-left" onClick={() => toggleNavbar(!isNavOpen)} />
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink onClick={() => {
                                    if(isNavOpen){toggleNavbar(!isNavOpen)}
                                    }} className="nav-link" to="/home">
                                    Home
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => {
                                    if(isNavOpen){toggleNavbar(!isNavOpen)}
                                    }} className="nav-link" to="/aboutus">
                                    About Us
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => {
                                    if(isNavOpen){toggleNavbar(!isNavOpen)}
                                    }} className="nav-link" to="/menu">
                                    Menu
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => {
                                    if(isNavOpen){toggleNavbar(!isNavOpen)}
                                    }} className="nav-link" to="/order">
                                    Order
                            </NavLink>
                            
                            </NavItem>
                            </Nav>
                    </Collapse>
                            {props.user != null
                                ?
                                <NavbarBrand disabled className="btn-profile">
                                    
                                        <span className="fa fa-user fa-lg"></span> <span className="text-capitalize"> {props.user.name}</span>

                                </NavbarBrand>
                                : null
                            }
                            <NavbarBrand>
                            <LoginButton user={props.user} signin={props.signin} signup={props.signup} logout={props.logout}/>
                            </NavbarBrand>
                </div>
            </Navbar>
        </React.Fragment>
    );
}

export default HeaderComponent;