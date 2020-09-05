
import * as ActionTypes from './ActionTypes';

export const Menu = (state = {
    isLoading: false,
    errMess: null,
    menu: []
}, action) => {
    switch (action.type) {
        case ActionTypes.MENU_LOADING:
            return { ...state, isLoading: true, errMess: null, menu: [] };
        case ActionTypes.ADD_MENU:
            return { ...state, isLoading: false, errMess: null, menu: action.payload };
        case ActionTypes.MENU_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, menu: [] };
        default:
            return state;
    }
}