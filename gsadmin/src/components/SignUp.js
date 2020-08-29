import React from 'react';
import { Form, LocalForm, Control } from 'react-redux-form';
import { FormGroup, Label, Card, CardBody, Button, FormText } from 'reactstrap';
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      number: '',
      logoImage: null,
      cafeImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleLogoImg = this.handleLogoImg.bind(this);
    this.handleCafeImg = this.handleCafeImg.bind(this);
  }
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleName = (event) => {
    this.setState({ name: event.target.value });
  }
  handleNumber = (event) => {
    this.setState({ number: event.target.value });
  }
  handleLogoImg = (event) => {
    this.setState({ logoImage: event.target.files[0] });
  }
  handleCafeImg = (event) => {
    this.setState({ cafeImage: event.target.files[0] });
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email, this.state.name, this.state.number);
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("name", this.state.name);
    formData.append("number", this.state.number);
    if (this.state.logoImage != null)
      formData.append("logoImage", this.state.logoImage, this.state.logoImage.name);
    if (this.state.cafeImage != null)
      formData.append("cafeImage", this.state.cafeImage, this.state.cafeImage.name);
    this.props.signup(formData);
  }
  render() {
    return (
      <CardBody>
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
          <div className="form-group row">

            <label htmlFor="name" className="col-sm-2 col-form-label">Cafe Name</label>

            <div className="col-sm-10">
              <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleName}></input>
            </div>
          </div>
          <div className="form-group row">

            <label htmlFor="number" className="col-sm-2 col-form-label">Mobile Number</label>

            <div className="col-sm-10">
              <input type="number" name="number" value={this.state.number} className="form-control" onChange={this.handleNumber}></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="logoImage"></label>
            </div>
            <div>
              <input type="file" name="logoImage" onChange={this.handleLogoImg}></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="cafeImage"></label>
            </div>
            <div>
              <input type="file" name="cafeImage" onChange={this.handleCafeImg}></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </CardBody>
    );
  }
}