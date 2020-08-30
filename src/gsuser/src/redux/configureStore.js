import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createForms } from 'react-redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Auth } from './auth';
import {Menu} from './menu';
import {Cart} from './cart';
import {CafeList} from './cafeList';
import {Orders} from './order'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            menu: Menu,
            cart: Cart,
            cafeList: CafeList,
            orders: Orders
        }),
        composeWithDevTools(
        applyMiddleware(thunk, logger))
    );

    return store;
}