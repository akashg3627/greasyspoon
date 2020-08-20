import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, loginUser, logoutUser} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';

import {DISHES} from '../shared/dishes';
import Footer from './Footer';

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
  const dishes = DISHES;
      return (
        <div>
          <HeaderComponent />  
              <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route exact path="/menu" component={()=><MenuComponet dishes={dishes}/>} />
                <Redirect to="/home" />
              </Switch>
              <Footer />
        </div>
      );
}

export default Main;