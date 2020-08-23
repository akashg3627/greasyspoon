import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';


function LoginComponent(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    function handleGoogleLogin(response) {
        console.log("buttun clicked", response)
        props.loginGoogleUser(response);
    }

    function handleLogout() {
        this.props.logoutUser();
    }




    function Userlogin() {
        return (
            <CardBody>
                <GoogleLogin
                clientId="899648060120-1mcodnjvohl5rpi4rfep56ms682f20t6.apps.googleusercontent.com"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleLogin}
                buttonText="Login with Google"
                 />
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
                    <CardBody><span className="fa fa-user-circle-o"></span> User<br></br>
                    <Button onClick={handleGoogleLogin}>Login with Google</Button>
                    </CardBody> 
                    <Userlogin />     
                </Card>

            </div>
        </div>
    );
}

export default LoginComponent;