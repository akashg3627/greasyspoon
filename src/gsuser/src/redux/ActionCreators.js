import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds: creds

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
    dispatch(requestLogin(creds))
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

                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};



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
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'api/menu/all', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        }
    })
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
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'api/cart', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        }
    })
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
        .then(cart => dispatch(addCart(cart)))
        .catch(error => dispatch(cartFailed(error.message)));
}

export const postCart = (body) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/cart', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
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
        .then(cart => { console.log('Cart Added', cart); dispatch(addCart(cart)); })
        .catch(error => dispatch(cartFailed(error.message)));
}

export const reduceCartdish = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/cart/' + dishId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
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
        .then(cart => { console.log('Updated Cart', cart); dispatch(addCart(cart)); })
        .catch(error => dispatch(cartFailed(error.message)));
};

export const deleteCartdish = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'api/cart/' + dishId + '/all', {
        method: "DELETE",
        headers: {
            'Authorization': bearer
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
        .then(cart => { console.log('Updated Cart', cart); dispatch(addCart(cart)); })
        .catch(error => dispatch(cartFailed(error.message)));
};