import React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { FormGroup, Label, Card, CardBody, Button, Col } from 'reactstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email: '',
      password: ''
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.signin({ email: this.state.email, password: this.state.password });
    this.props.toggleModal();
  }
  render() {
    return (
        <CardBody className="gs-color-dark">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group row">

            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>

            <div className="col-sm-10">
              <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handleEmail}></input>
            </div>
          </div>
          <div className="form-group row">

            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>

            <div className="col-sm-10">
              <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handlePassword}></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>
        </CardBody>
    );
  }
}