import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import LoginComponent from './Login';
import SignUp from './SignUp';

import {DISHES} from '../shared/dishes';
import Footer from './Footer';

import {signin, signup, logout, fetchMenu, deleteDish, checkauth, addDishWI, editDishWI, acceptOrder, rejectOrder, completeOrder} from '../redux/ActionCreators';
import OrderPanel from './OrderPanel';

const mapStateToProps =(state)=>{
  return{
  auth: state.auth,
  menu: state.menu,
  orders: state.orders
  }
}


const mapDispatchToProps=(dispatch)=>({
signin: (creds)=> dispatch(signin(creds)),
signup: (formData)=> dispatch(signup(formData)),
logout: () => dispatch(logout()),
fetchMenu: (cafeId)=>dispatch(fetchMenu(cafeId)),
deleteDish: (dishId)=>dispatch(deleteDish(dishId)),
checkauth: ()=>dispatch(checkauth()),
addDishWI: (formData)=>dispatch(addDishWI(formData)),
editDishWI: (formData)=>{dispatch(editDishWI(formData))},
acceptOrder: (orderId)=>dispatch(acceptOrder(orderId)),
rejectOrder: (orderId)=>dispatch(rejectOrder(orderId)),
completeOrder: (orderId)=>dispatch(completeOrder(orderId)),
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
          <HeaderComponent user={this.props.auth.user} signin={this.props.signin} signup={this.props.signup} logout={this.props.logout} />  
          <Switch>
                <Route path="/home" component={HomeComponent} />
                <PrivateRoute exact path="/menu" component={()=><MenuComponet editDishWI={this.props.editDishWI} addDishWI={this.props.addDishWI} deleteDish={this.props.deleteDish} menu={this.props.menu.menu} user={this.props.auth.user} fetchMenu={this.props.fetchMenu} isLoading={this.props.menu.isLoading} errMess={this.props.menu.errMess} />} />
                <PrivateRoute exact path="/order" component={()=> <OrderPanel orders={this.props.orders} acceptOrder={this.props.acceptOrder} rejectOrder={this.props.rejectOrder} completeOrder={this.props.completeOrder} />} />
                {/*<Route exaxt path ="/login" component={()=><LoginComponent history={this.props.history} signin={this.props.signin} signup={this.props.signup} />} />
                */}
                <Redirect to="/home" />
          </Switch>
              <Footer />
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));