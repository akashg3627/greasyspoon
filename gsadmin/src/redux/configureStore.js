import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Auth } from './auth';
import {Menu} from './menu'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Orders } from './order';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            //dishes: Dishes,
            auth: Auth,
            menu: Menu,
            orders: Orders
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}