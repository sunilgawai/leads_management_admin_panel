// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import userSlice from './userSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, userSlice });

export default reducers;
