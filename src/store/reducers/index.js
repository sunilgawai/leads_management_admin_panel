// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import userSlice from './userSlice';
import customerSlice from './customerSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, userSlice, customerSlice });

export default reducers;
