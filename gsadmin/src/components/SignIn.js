import React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.signin({ email: values.username, password: values.password });
    this.props.toggleModal();
  }
  render() {
    return (
        <CardBody>
          <LocalForm className="mt-2" onSubmit={(values) => this.handleSubmit(values)}>
            <FormGroup row>
              <Label htmlFor="username">User Name</Label>
              <Control.text model=".username" name="username" id="username" placeholder="User Name" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="password">Password</Label>
              <Control.text model=".password" type="password" name="password" id="password" placeholder="Password" />
            </FormGroup>
            <FormGroup className="mt-5">
              <Button type="submit" value="submit" color="primary" size="lg" block>Sign In</Button>
            </FormGroup>
          </LocalForm>
        </CardBody>
    );
  }
}