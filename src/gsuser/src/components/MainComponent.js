import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, loginUser, logoutUser, loginGoogleUser} from '../redux/ActionCreators';
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
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
fetchDishes: () => {dispatch(fetchDishes())},
//loginUser: () => dispatch(loginUser()),
//logoutUser: () => dispatch(logoutUser()),
loginGoogleUser: ()=>dispatch(loginGoogleUser())
});

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       this.props.auth.isAuthenticated
//         ? <Component {...props} />
//         : <Redirect to={{
//             pathname: '/home',
//             state: { from: props.location }
//           }} />
//     )} />
//   );


function Main(props) {
  const dishes = props.dishes;
      return (
        <div>
          <HeaderComponent />  
              <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route exact path="/menu" component={()=><MenuComponet dishes={dishes}/>} />
                <Route path="/login" component={()=><LoginComponent auth={props.auth} loginGoogleUser={props.loginGoogleUser}/> } />
                <Redirect to="/home" />
              </Switch>
          <Footer />  
        </div>
      );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));