import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, loginGoogleUser, fetchMenu, fetchCart, reduceCartdish, postCart, fetchcafeList, addUser} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import Footer from './Footer';
import Menu from './Menu';
import OrderPanel from './OrderPanel';

//import {DISHES} from '../shared/dishes';
import LoginComponent from './LoginComponent';

const mapStateToProps = state => {
  return {
    auth: state.auth,
    menu: state.menu,
    cart: state.cart,
    cafeList: state.cafeList
  }
}

const mapDispatchToProps = (dispatch) => ({
fetchMenu: ()=> {dispatch(fetchMenu())},
fetchCart: ()=>{dispatch(fetchCart())},
postCart: (body)=>{dispatch(postCart(body))},
fetchcafeList: ()=>{dispatch(fetchcafeList())},
reduceCartdish: (dishId)=>{dispatch(reduceCartdish(dishId))},
logoutUser: () => {dispatch(logoutUser())},
loginGoogleUser: (data)=>dispatch(loginGoogleUser(data)),
addUser: ()=>dispatch(addUser())
});




class Main extends Component {
componentDidMount() {
this.props.fetchMenu();
this.props.fetchCart();
this.props.fetchcafeList();
}

  render(){

    const MenuCafe = ({match})=>{
      return(
      <MenuComponet 
      cafemenu={this.props.menu.menu.filter((cafemenu) => cafemenu.cafe_id === match.params.cafeId)[0]} 
      isLoading={this.props.menu.isLoading} 
      errMess={this.props.menu.errMess} 
      cart={this.props.cart} 
      postCart={this.props.postCart} 
      reduceCartdish={this.props.reduceCartdish} />
      )
    }

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
          <HeaderComponent auth={this.props.auth} logoutUser={this.props.logoutUser} />  
              <Switch>
                <Route path="/home" component={HomeComponent} />
                <PrivateRoute exact path="/menu" component={()=><Menu cafeList={this.props.cafeList} />} />
                <PrivateRoute path="/menu/:cafeId" component={MenuCafe} />
                <PrivateRoute exact path="/orderpanel" component={()=><OrderPanel auth={this.props.auth} cart={this.props.cart} />} />
                <Route path="/login" component={()=><LoginComponent auth={this.props.auth} loginGoogleUser={this.props.loginGoogleUser} addUser={this.props.addUser} /> } />
                <Redirect to="/home" />
              </Switch>
          <Footer />  
        </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));