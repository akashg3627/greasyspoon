import * as ActionTypes from './ActionTypes';

export const Orders =(state={
    isLoading : false,
    errMess: '',
    orders: []
}, action)=>{
switch(action.type){
    case ActionTypes.ORDER_LOADING:
        return {...state, isLoading:true, errMess: '', orders: []};
    case ActionTypes.ADD_ORDER:
        return {...state, isLoading:false, errMess: '', orders: action.payload};
    case ActionTypes.ORDER_FAILED:
        return {...state, isLoading: false, errMess: action.payload, orders: []};
    default:
        return state;
}
}