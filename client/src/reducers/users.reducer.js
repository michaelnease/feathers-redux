import * as actionTypes from '../constants/action.types';
import initialState from './initial.state';

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.MAIN_GET_USERS:
      return action.users;
    default:
      return state;
  }
}
