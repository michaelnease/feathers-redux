import { combineReducers } from 'redux';
import meta from './metaReducer';
import users from './usersReducer';

const rootReducer = combineReducers({
  meta,
  users,
});
export default rootReducer;
