import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, loginGoogleUser, fetchMenu, fetchCart, reduceCartdish, postCart, fetchcafeList, checkauth, postOrder} from '../redux/ActionCreators';


import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import Footer from './Footer';
import Menu from './Menu';
import OrderPanel from './OrderPanel';
import Aboutus from './Aboutus';


const mapStateToProps = state => {
  return {
    auth: state.auth,
    menu: state.menu,
    cart: state.cart,
    cafeList: state.cafeList,
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => ({
fetchMenu: ()=> {dispatch(fetchMenu())},
fetchCart: ()=>{dispatch(fetchCart())},
postCart: (dishId, cafeId)=>{dispatch(postCart(dishId, cafeId))},
fetchcafeList: ()=>{dispatch(fetchcafeList())},
reduceCartdish: (dishId)=>{dispatch(reduceCartdish(dishId))},
logoutUser: () => {dispatch(logoutUser())},
loginGoogleUser: (data)=>dispatch(loginGoogleUser(data)),
checkauth: ()=>dispatch(checkauth()),
postOrder: ()=>dispatch(postOrder())
});




class Main extends Component {
constructor(props){
  super(props);
  this.state={
    loginmodal: false
  };
  this.toggleModal = this.toggleModal.bind(this);
}
toggleModal(){
  this.setState({loginmodal: !this.state.loginmodal});
}

componentDidMount() {
  if(localStorage.getItem('token') != null)
    {
    this.props.checkauth();
  }
this.props.fetchMenu();
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
      reduceCartdish={this.props.reduceCartdish}
      cafe={this.props.cafeList.list.filter((cafe)=> cafe._id === match.params.cafeId)[0]} />
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
          <HeaderComponent loginmodal={this.state.loginmodal} toggleModal={this.toggleModal} auth={this.props.auth} loginGoogleUser={this.props.loginGoogleUser} logoutUser={this.props.logoutUser} />  
          
              <Switch>
              <Route path="/home" component={()=><HomeComponent auth={this.props.auth} loginmodal={this.state.loginmodal} toggleModal={this.toggleModal} />} />
               <Route exact path="/aboutus" component={Aboutus} />
                <PrivateRoute exact path="/menu" component={()=><Menu cafeList={this.props.cafeList} />} />
                <PrivateRoute path="/menu/:cafeId" component={MenuCafe} />
                <PrivateRoute exact path="/order" component={()=><OrderPanel auth={this.props.auth} orders={this.props.orders} cart={this.props.cart} postOrder={this.props.postOrder} />} />
                <Redirect to="/home" />
              </Switch>
              
          <Footer />  
        </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));