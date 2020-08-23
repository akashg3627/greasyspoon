import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
=======
import { Link } from 'react-router-dom';
>>>>>>> 62efff06c8ed5a9d1fa40527f793f1df0d833232


function LoginComponent(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    function handleGoogleLogin() {
        console.log("buttun clicked")
        props.loginGoogleUser();
    }

<<<<<<< HEAD
    function responseGoogle(res){
if(res)
{props.loginGoogleUser()}
else{
    console.log("google login failed")
}
    }
    
=======
>>>>>>> 62efff06c8ed5a9d1fa40527f793f1df0d833232
    function handleLogout() {
        this.props.logoutUser();
    }


    function Cafelogin() {
        return (
            <CardBody>
                <Form className="mt-2" onSubmit={handleGoogleLogin}>
                    <FormGroup row>
                        <Label for="userid">User Name</Label>
                        <Input type="email" name="userid" id="userid" placeholder="User Name" />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup className="mt-5">
                        <Button type="submit" value="submit" color="primary" size="lg" block>Login</Button>
                    </FormGroup>
                </Form>
            </CardBody>
        );
    }

    function Cafesignup() {
        return (
            <CardBody>
                <Form className="mt-2">
                    <FormGroup row>
                        <Label for="userid">User Name</Label>
                        <Input type="email" name="userid" id="userid" placeholder="User Name" />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup className="mt-5">
                        <Button color="primary" size="lg" block>Login</Button>
                    </FormGroup>

                </Form>
            </CardBody>
        );
    }

    function Userlogin() {
        return (
            <CardBody>
<<<<<<< HEAD
                <GoogleLogin
                clientId="899648060120-1mcodnjvohl5rpi4rfep56ms682f20t6.apps.googleusercontent.com"
                buttonText="Login using Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className="btn btn-outline-danger"
                 />
=======
                <a href="http://localhost:5000/api/profile/login/user" color="danger" size="lg" block><span className="fa fa-google-plus"></span> LogIn with institute id</a>
>>>>>>> 62efff06c8ed5a9d1fa40527f793f1df0d833232
            </CardBody>
        );
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
                            <NavLink onClick={() => { toggle('1'); }}>
                                <span className="fa fa-user-circle-o"></span> User
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => { toggle('2'); }}>
                                Login as Cafe
                                </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Userlogin />
                        </TabPane>
                        <TabPane tabId="2">
                            <Cafelogin />
                        </TabPane>
                    </TabContent>
                </Card>

            </div>
        </div>
    );
}

export default LoginComponent;