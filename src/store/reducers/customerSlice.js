import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'services/ApiService';

const customerStateStatus = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
});

const initialState = {
  customers: [],
  customer: {},
  status: customerStateStatus.IDLE,
  error: null
};

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  try {
    const res = await ApiService.getCustomers();
    const customers = await res.data;
    return customers;
  } catch (error) {
    console.log('error fetching customers', error);
    throw error;
  }
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId, { getState }) => {
  try {
    console.log(customerId);
    await ApiService.deleteCustomer(customerId);
    const { customers } = getState().customerSlice;
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    return updatedCustomers;
  } catch (error) {
    console.log('error deleting customer', error);
    throw error;
  }
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomer: (state, action) => {
      const customer = action.payload;
      console.log('customer', customer);
      state.customers.push(customer);
      state.customer = customer;
    },
    removeCustomer: (state, action) => {
      const customerId = action.payload;
      console.log('customer', customerId);
      console.log(state.customers.length);
      const updatedCustomers = state.customers.filter((customer) => customer.id !== customerId);
      state.customers = updatedCustomers;
      console.log(state.customers.length);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = customerStateStatus.LOADING;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = customerStateStatus.SUCCEEDED;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = customerStateStatus.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = customerStateStatus.LOADING;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = customerStateStatus.SUCCEEDED;
        state.customers = action.payload;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = customerStateStatus.FAILED;
        state.error = action.error.message;
      });
  }
});

export const { setCustomers, setCustomer, removeCustomer } = customerSlice.actions;
export default customerSlice.reducer;
