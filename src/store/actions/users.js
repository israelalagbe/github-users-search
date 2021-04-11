import * as actionTypes from './actionTypes';
import api from '../../util/api';
import {
    NotificationManager
} from 'react-notifications';


const baseUrl = "https://api.github.com";


/**
 * @param {object} query 
 * @param {string} query.q
 * @param {string} query.limit
 * @param {string} query.page
 */
export const fetchUsers = (query) => {
    return async (dispatch) => {
        dispatch(fetchUsersStarted());
        try {
            const result = await api.get(`${baseUrl}/search/users`, {
                params: {
                    q: query.q,
                    per_page: query.limit,
                    page: query.page
                }
            });

            dispatch(fetchUsersSuccess({
                users: result.items,
                total: result.total_count
            }));
        } catch (error) {

            dispatch(fetchUsersError(error));
            NotificationManager.error(error.message)
        }
    }
};

/**
 * @param {string} username 
 */
export const fetchUser = (username) => {
    return async (dispatch) => {
        dispatch(fetchSingleUserStarted());
        try {
            const user = await api.get(`${baseUrl}/users/${username}`);
          
            dispatch(fetchSingleUserSuccess({
                user
            }));
        } catch (error) {

            dispatch(fetchSingleUserError(error));
            NotificationManager.error(error.message)
        }
    }
};


export const fetchUsersStarted = () => {
    return {
        type: actionTypes.FETCH_USERS
    };
};

export const fetchUsersError = (error) => {
    return {
        payload: error,
        type: actionTypes.FETCH_USERS_ERROR
    };
};

export const fetchUsersSuccess = (payload) => {
    return {
        payload,
        type: actionTypes.FETCH_USERS_SUCCESS
    };
};



export const fetchSingleUserStarted = () => {
    return {
        type: actionTypes.FETCH_SINGLE_USER
    };
};

export const fetchSingleUserSuccess = (payload) => {
    return {
        payload,
        type: actionTypes.FETCH_SINGLE_USER_SUCCESS
    };
};

export const fetchSingleUserError = (error) => {
    return {
        payload: error,
        type: actionTypes.FETCH_SINGLE_USER_ERROR
    };
};



