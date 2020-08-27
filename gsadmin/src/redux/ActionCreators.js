import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const checkauth =() =>(dispatch)=>{
    const token = localStorage.getItem('token');
    console.log("token", token);
    //const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'api/profile/check',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            console.log("error 1");
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        console.log("error 2");
        throw error;
    })
    .then(response => response.json())
    .then(response => {
    if (!response.isAuthorized) {
        // Session Expired
        localStorage.clear();
    }
    else{
        if(response.user){
            localStorage.clear();
            console.log("user is authorised")
        }
        else if(response.cafe){
            const cafe = JSON.parse(response.cafe);
            const id = cafe._id;
            console.log("Cafe is Autherised")
            dispatch(fetchMenu(id));
        }
    } 
    })
    .catch(error => dispatch(loginError(error.message)))
    }

export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        user: response.user

    }
}
  
export const loginError = (message) => {
    localStorage.clear();
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
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
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}


export const signin = (creds) =>(dispatch) =>{
    console.log("signin reducer");
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(requestLogin());
    
    return fetch(baseUrl + 'api/profile/login/cafe', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
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
            const user=JSON.stringify(response.user)
            localStorage.setItem('creds', user);
            // Dispatch the success action
            dispatch(receiveLogin(response));
            dispatch(fetchMenu(user._id));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
}

export const signup = (creds) =>(dispatch) =>{
    console.log("signup reducer",creds );
    dispatch(requestLogin());
    
    return fetch(baseUrl + 'api/profile/register/cafe', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds),
        credentials:'same-origin'
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
            const user=JSON.stringify(response.user)
            localStorage.setItem('creds', user);
            // Dispatch the success action
            dispatch(receiveLogin(response));
            dispatch(fetchMenu(user._id));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
}


export const addMenu=(menu)=>{
return{
    type: ActionTypes.ADD_MENU,
    payload: menu
}
}

export const menuLoading=()=>{
    return{
        type: ActionTypes.MENU_LOADING
    }
}

export const menuFailed = ()=>{
    return{
        type: ActionTypes.MENU_FAILED
    }
}

export const fetchMenu = (cafeId) =>(dispatch)=>{

    dispatch(menuLoading());
    const token = localStorage.getItem('token');
    const cafe_id = cafeId;
    return fetch(baseUrl + 'api/menu/'+ cafe_id,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
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
            throw error;
        })
    .then(response => response.json())
    .then((response)=>{
        dispatch(addMenu(response));
    })
    .catch(error => dispatch(menuFailed(error.message)))
}


export const deleteDish=(dishId)=>(dispatch)=>{
    const token = localStorage.getItem('token');

    return fetch('api/menu/'+ dishId, {
        method : "DELETE",
        headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        credentials: 'same-origin'
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
    .then((response)=>{
        dispatch(addMenu(response));
    })
    .catch(error => console.log(error));
}