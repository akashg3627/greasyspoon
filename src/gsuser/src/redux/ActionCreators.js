import * as ActionTypes from './ActionTypes';
import {
    baseUrl
} from '../shared/baseUrl';
//import axios from 'axios';

export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST

    }
}

export const receiveLogin = (res) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: res
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message: message
    }
}

export const loginGoogleUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin())
    return fetch(baseUrl + 'api/profile/login/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                // Dispatch the success action
                dispatch(receiveLogin(response.token));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const addUser = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const token = localStorage.getItem('token');
    return fetch(baseUrl + 'api/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer,
                'X-Auth-Token': token
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem('creds', user);
            dispatch(AddUser(user))
        })
        .catch(error => dispatch(loginError(error.message)))
}

export const AddUser = (user) => {
    return {
        type: ActionTypes.ADD_USER,
        payload: user
    }
}



export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(receiveLogout())
}



//Dishes reducers
/*
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'api/menu/')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
*/



export const menuLoading = () => ({
    type: ActionTypes.MENU_LOADING
});

export const addMenu = (menu) => ({
    type: ActionTypes.ADD_MENU,
    payload: menu
});

export const menuFailed = (errmess) => ({
    type: ActionTypes.MENU_FAILED,
    payload: errmess
})

export const fetchMenu = () => (dispatch) => {
    dispatch(menuLoading(true));
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'api/menu/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer,
                'X-Auth-Token': token
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(menu => dispatch(addMenu(menu)))
        .catch(error => dispatch(menuFailed(error.message)));
}


//Cart

export const cartLoading = () => ({
    type: ActionTypes.CART_LOADING
});

export const addCart = (cart) => ({
    type: ActionTypes.ADD_CART,
    payload: cart
});

export const cartFailed = (errmess) => ({
    type: ActionTypes.CART_FAILED,
    payload: errmess
})

export const fetchCart = () => (dispatch) => {
    dispatch(cartLoading(true));
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'api/cart', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer,
                'X-Auth-Token': token
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(cart => dispatch(addCart(cart)))
        .catch(error => dispatch(cartFailed(error.message)));
}

export const postCart = (creds) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const token = localStorage.getItem('token');
    return fetch(baseUrl + 'api/cart', {
            method: "POST",
            body: JSON.stringify({
                dish_id: creds.dish_id,
                cafe_id: creds.cafe_id
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer,
                'X-Auth-Token': token
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(cart => {
            console.log('Cart Added', cart);
            dispatch(addCart(cart));
        })
        .catch(error => dispatch(cartFailed(error.message)));
}

export const reduceCartdish = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const token = localStorage.getItem('token');
    return fetch(baseUrl + 'api/cart/' + dishId, {
            method: "DELETE",
            headers: {
                'Authorization': bearer,
                'X-Auth-Token': token
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(cart => {
            console.log('Updated Cart', cart);
            dispatch(addCart(cart));
        })
        .catch(error => dispatch(cartFailed(error.message)));
};

export const deleteCartdish = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const token = localStorage.getItem('token');
    return fetch(baseUrl + 'api/cart/' + dishId + '/all', {
            method: "DELETE",
            headers: {
                'Authorization': bearer,
                'X-Auth-Token': token
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(cart => {
            console.log('Updated Cart', cart);
            dispatch(addCart(cart));
        })
        .catch(error => dispatch(cartFailed(error.message)));
};


// CAfeList

export const fetchcafeList = () => (dispatch) => {
    dispatch(cafelistLoading(true));

    return fetch(baseUrl + 'api/menu')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(cafeList => dispatch(addcafelist(cafeList)))
        .catch(error => dispatch(cafelistFailed(error.message)));
}

export const cafelistLoading = () => ({
    type: ActionTypes.CAFE_LIST_LOAD
});

export const cafelistFailed = (errmess) => ({
    type: ActionTypes.CAFE_LIST_FAIL,
    payload: errmess
});

export const addcafelist = (cafeList) => ({
    type: ActionTypes.CAFE_LIST_ADD,
    payload: cafeList
});