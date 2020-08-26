import React from 'react';
import { Form, LocalForm, Control } from 'react-redux-form';
import { FormGroup, Label, Card, CardBody, Button, FormText } from 'reactstrap';
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.props.signup({ email: values.email, password: values.password, name: values.name, number: values.number });
  }
  render() {
    return (
      <Card>
        <CardBody>
          <Form model='user' className="mt-2" onSubmit={(values) => this.handleSubmit(values)}>
            <FormGroup row>
              <Label htmlFor="email">Email</Label>
              <Control.text model=".email" name="email" id="email" placeholder="Email Id" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="password">Password</Label>
              <Control.text model=".password" type="password" name="password" id="password" placeholder="Password" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="name">Cafe Name</Label>
              <Control.text model=".name" name="name" id="name" placeholder="Your Name" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="number">Mobile Number</Label>
              <Control.text model=".number" name="number" id="number" placeholder="Mobile Number" />
            </FormGroup>
            <FormGroup className="mt-5">
              <Button type="submit" value="submit" color="primary" size="lg" block>Sign Up</Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}