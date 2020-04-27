import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return action.users;
    default:
      return state;
  }
}
