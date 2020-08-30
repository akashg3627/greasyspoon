import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import {Link, Route} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

function LoginComponent(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <Card className="login-card">
                    <CardHeader>
                        <span className="g">GREASY</span><span className="s">SPOON</span>
                    </CardHeader>
                    <Nav tabs>
                        <NavItem>
                            <NavLink onClick={()=>{toggle('1')}}>
                                Sign Up
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={()=>{toggle('2')}}>
                                Sign In
                                </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
<SignUp signup={props.signup}/>
                        </TabPane>
                        <TabPane tabId="2">
<SignIn signin={props.signin}/>
                        </TabPane>
                    </TabContent>
                </Card>

            </div>
        </div>
    );
}

export default LoginComponent;

