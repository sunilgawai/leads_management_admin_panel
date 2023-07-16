// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import userSlice from './userSlice';
import customerSlice from './customerSlice';
import { customersApi } from 'store/reducers/customersApi';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, userSlice, customerSlice, [customersApi.reducerPath]: customersApi.reducer });

export default reducers;
