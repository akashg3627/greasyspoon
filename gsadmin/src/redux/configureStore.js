import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms} from 'react-redux-form';
//import { Dishes } from './dishes';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const initialstate={
email: '',
password: '',
name: '',
number: ''
}

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            //dishes: Dishes,
            auth: Auth,
            ...createForms({
                user: initialstate
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}