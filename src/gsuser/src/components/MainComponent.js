import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, loginUser, logoutUser, loginGoogleUser, fetchMenu, fetchCart, reduceCartdish, postCart} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import Footer from './Footer';

import {DISHES} from '../shared/dishes';
import LoginComponent from './LoginComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    auth: state.auth,
    menu: state.menu,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => ({
fetchDishes: () => {dispatch(fetchDishes())},
fetchMenu: ()=> {dispatch(fetchMenu())},
fetchCart: ()=>{dispatch(fetchCart())},
postCart: (body)=>{dispatch(postCart(body))},
reduceCartdish: (dishId)=>{dispatch(reduceCartdish(dishId))},
//loginUser: () => dispatch(loginUser()),
//logoutUser: () => dispatch(logoutUser()),
loginGoogleUser: (data)=>dispatch(loginGoogleUser(data))
});




class Main extends Component {
componentDidMount() {
this.props.fetchMenu();
this.props.fetchCart();
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
                <PrivateRoute exact path="/menu" component={()=><MenuComponet menu={this.props.menu.menu} isLoading={this.props.menu.isLoading} errMess={this.props.menu.errMess} cart={this.props.cart} postCart={this.props.postCart} reduceCartdish={this.props.reduceCartdish} />} />
                <Route path="/login" component={()=><LoginComponent auth={this.props.auth} loginGoogleUser={this.props.loginGoogleUser}/> } />
                <Redirect to="/home" />
              </Switch>
          <Footer />  
        </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));