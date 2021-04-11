import * as actionTypes from './actionTypes';
import api from '../../util/api';
import { NotificationManager } from 'react-notifications';


const baseUrl = "https://api.github.com/search/users";


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
        const { users, total } = await api.get(`${baseUrl}/users`, {
          params: query
        });
        dispatch(fetchUsersSuccess({
          users,
          total
        }));
  
      } catch (error) {
  
        dispatch(fetchUsersError(error));
        NotificationManager.error("Error occured while loading users, please check your internet connection!")
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