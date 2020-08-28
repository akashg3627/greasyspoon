import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import LoginComponent from './Login';
import SignUp from './SignUp';

import {DISHES} from '../shared/dishes';
import Footer from './Footer';

import {signin, signup, fetchMenu, deleteDish, checkauth, addDishWI} from '../redux/ActionCreators';

const mapStateToProps =(state)=>{
  return{
  auth: state.auth,
  menu: state.menu
  }
}


const mapDispatchToProps=(dispatch)=>({
signin: (creds)=> dispatch(signin(creds)),
signup: (creds)=> dispatch(signup(creds)),
fetchMenu: (cafeId)=>dispatch(fetchMenu(cafeId)),
deleteDish: (dishId)=>dispatch(deleteDish(dishId)),
checkauth: ()=>dispatch(checkauth()),
addDishWI: (formData)=>dispatch(addDishWI(formData))
});

class Main extends Component {

  componentDidMount(){
    if(localStorage.getItem('token') != null)
    {
    this.props.checkauth();
  }
  }
  
  render(){

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

      return (
        <div>
          <HeaderComponent />  
          <Switch>
                <Route path="/home" component={HomeComponent} />
                <PrivateRoute exact path="/menu" component={()=><MenuComponet addDishWI={this.props.addDishWI} deleteDish={this.props.deleteDish} menu={this.props.menu.menu} user={this.props.auth.user} fetchMenu={this.props.fetchMenu} isLoading={this.props.menu.isLoading} errMess={this.props.menu.errMess} />} />
                <Route exaxt path ="/login" component={()=><LoginComponent signin={this.props.signin} signup={this.props.signup} />} />
                <Redirect to="/home" />
          </Switch>
              <Footer />
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));