import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Dishes } from './dishes/dishes';
import { Auth } from './auth';
import {Menu} from './menu';
import {Cart} from './cart';
import {CafeList} from './cafeList'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            auth: Auth,
            menu: Menu,
            cart: Cart,
            cafeList: CafeList
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}