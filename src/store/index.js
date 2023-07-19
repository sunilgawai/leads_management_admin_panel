// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
// import { customersApi } from './reducers/customersApi';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  // middleware: (dm) => dm().concat(customersApi.middleware),
  devTools: true
});

const { dispatch } = store;

export { store, dispatch };
