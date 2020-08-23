import React, { useState, Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import * as actions from '../redux/ActionCreators'


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (res) => {
        if(res.accessToken)
        {
        this.props.loginGoogleUser({"googleId": res.profileObj.googleId, "name": res.profileObj.name, "email": res.profileObj.email});
        }
        else{
            console.log("Invalid");
        }
    }

    render() {
        const Userlogin = () => {
            return (
                <CardBody>
                    <GoogleLogin
                        clientId="899648060120-1mcodnjvohl5rpi4rfep56ms682f20t6.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        className="btn btn-outline-danger"
                    />
                </CardBody>
            )
        };

        return (
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <Card className="login-card">
                        <CardHeader>
                            <span className="g">GREASY</span><span className="s">SPOON</span>
                        </CardHeader>
                        <Userlogin />
                    </Card>

                </div>
            </div>
        );
    }
}


export default LoginComponent;