import { combineReducers } from 'redux';
import meta from './meta.reducer';
import users from './users.reducer';

const rootReducer = combineReducers({
  meta,
  users,
});
export default rootReducer;
