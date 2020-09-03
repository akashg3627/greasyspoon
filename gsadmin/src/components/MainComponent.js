import React, { Component, useState } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import Footer from './Footer';

import {signin, signup, logout, fetchMenu, deleteDish, checkauth, addDishWI, editDishWI, acceptOrder, rejectOrder, completeOrder} from '../redux/ActionCreators';
import OrderPanel from './OrderPanel';
import Aboutus from './Aboutus';

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
  constructor(props){
    super(props);
    this.state={
      loginmodal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }
 toggleModal(){
   this.setState({loginmodal: !this.state.loginmodal});
 }
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
          <HeaderComponent loginmodal={this.state.loginmodal} toggleModal={this.toggleModal} user={this.props.auth.user} signin={this.props.signin} signup={this.props.signup} logout={this.props.logout} />  
          <Switch>
                <Route path="/home" component={()=><HomeComponent auth={this.props.auth} loginmodal={this.state.loginmodal} toggleModal={this.toggleModal} />} />
                <Route path="/aboutus" component={Aboutus} />
                <PrivateRoute exact path="/menu" component={()=><MenuComponet editDishWI={this.props.editDishWI} addDishWI={this.props.addDishWI} deleteDish={this.props.deleteDish} menu={this.props.menu.menu} user={this.props.auth.user} fetchMenu={this.props.fetchMenu} isLoading={this.props.menu.isLoading} errMess={this.props.menu.errMess} />} />
                <PrivateRoute exact path="/order" component={()=> <OrderPanel orders={this.props.orders} acceptOrder={this.props.acceptOrder} rejectOrder={this.props.rejectOrder} completeOrder={this.props.completeOrder} />} />
                <Redirect to="/home" />
          </Switch>
              <Footer />
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));