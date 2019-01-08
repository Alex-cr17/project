import axios from 'axios';
import { apiUrl } from '../config'
import { GET_ERRORS, SET_CURRENT_USER, GET_ALL_USERS, GET_LIST_MESSAGES } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post(`${apiUrl}/register`, user)
            .then(
                res => {
                    history.push('/login')
                })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post(`${apiUrl}/login`, user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
export const setAllUsers = users => {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}

export const setListMessages = message => {
    return {
        type: GET_LIST_MESSAGES,
        payload: message
    }
}

export const chatUser = (history) => dispatch => {
    axios.post(`${apiUrl}/chat`, )
}

export const getUsersList = () => dispatch => {
    axios.get(`${apiUrl}/getusers`).then(res => {
        dispatch(setAllUsers(res.data));
    })
}

export const getListMessages = (listMessages) => dispatch => {
        dispatch(setListMessages(listMessages));
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}