import { combineReducers } from 'redux';
import meta from './metaReducer';

const rootReducer = combineReducers({
  meta,
});
export default rootReducer;
