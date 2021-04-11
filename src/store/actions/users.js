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

/**
 * Used to fetch data used for the auto completion of the search field
 * @param {string} search
 */
export const fetchUsersCompletion = (search) => {
    return async (dispatch) => {
        dispatch(fetchUsersCompletionsStarted());
        try {
            const result = await api.get(`${baseUrl}/search/users`, {
                params: {
                    q: search,
                    per_page: 50,
                    page: 1
                }
            });

            dispatch(fetchUsersCompletionsSuccess({
                users: result.items
            }));
        } catch (error) {

            dispatch(fetchUsersCompletionsError(error));
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




export const fetchUsersCompletionsStarted = () => {
    return {
      type: actionTypes.FETCH_USERS_COMPLETION
    };
  };
  
  export const fetchUsersCompletionsError = (error) => {
    return {
      payload: error,
      type: actionTypes.FETCH_USERS_COMPLETION_ERROR
    };
  };
  
  export const fetchUsersCompletionsSuccess = (payload) => {
    return {
      payload,
      type: actionTypes.FETCH_USERS_COMPLETION_SUCCESS
    };
  };
  