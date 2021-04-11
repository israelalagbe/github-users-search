import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  selectedUser: null,
  //Used for auto completion of the search field
  usersCompletions: [],
}

const userReducer = (state = initialState, action) => {
  const stateClone = {
    ...state
  };
  switch (action.type) {
    //Users
    case actionTypes.FETCH_USERS: {
      stateClone.loading = true;
      break;
    }
    case actionTypes.FETCH_USERS_SUCCESS: {
      stateClone.loading = false;
      stateClone.users = action.payload.users;
      stateClone.total = action.payload.total;
      break;
    }
   
    case actionTypes.FETCH_USERS_ERROR: {
      stateClone.loading = false;
      stateClone.error = action.payload;
      break;
    }


    //Selected user
    case actionTypes.FETCH_SINGLE_USER: {
      stateClone.selectedUser = null;
      break;
    }
    case actionTypes.FETCH_SINGLE_USER_SUCCESS: {
      stateClone.selectedUser = action.payload.user;
      break;
    }
   
    case actionTypes.FETCH_SINGLE_USER_ERROR: {
      stateClone.error = action.payload;
      break;
    }

    //Actions for auto completion of the input field
    case actionTypes.FETCH_USERS_COMPLETION: {
      stateClone.loading = true;
      break;
    }
    case actionTypes.FETCH_USERS_COMPLETION_SUCCESS: {
      stateClone.loading = false;
      stateClone.usersCompletions = action.payload.users;
      break;
    }
    case actionTypes.FETCH_USERS_COMPLETION_ERROR: {
      stateClone.loading = false;
      stateClone.error = action.payload;
      break;
    }
    default:
      ;
  }
  return stateClone;
};

export default userReducer;