import * as ActionTypes from './ActionTypes';

export const CafeList = (state = {
    isLoading: false,
    errMess: null,
    list: []
}, action) => {
    switch (action.type) {
        case ActionTypes.CAFE_LIST_LOAD:
            return { ...state, isLoading: true, errMess: null, list: [] };
        case ActionTypes.CAFE_LIST_ADD:
            return { ...state, isLoading: false, errMess: null, list: action.payload };
        case ActionTypes.CAFE_LIST_FAIL:
            return { ...state, isLoading: false, errMess: action.payload, list:[] };
        default:
            return state;
    }
}