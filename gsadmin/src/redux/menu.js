import * as ActionTypes from './ActionTypes';

export const Menu = (state={
isLoading: false,
errMess: null,
dishes: null
}, action)=>{

    switch(action.type){
        case ActionTypes.MENU_LOADING:
            return{...state, isLoading: true, errMess: null, dishes: null};
        case ActionTypes.ADD_MENU:
            return{...state, isLoading: false, errMess: null, dishes: action.payload};
        case ActionTypes.MENU_FAILED:
            return{...state, isLoading: false, errMess: action.message , dishes: null};
        default:
             return state;
    }
}