import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';

export default function metaReducer(state = initialState.meta, action) {
  switch (action.type) {
    case actionTypes.APP_BOOT:
      return { ...state, site: action.site };
    default:
      return state;
  }
}
