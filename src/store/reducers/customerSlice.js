/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'services/ApiService';

const customerStateStatus = Object.freeze({
    'IDLE': 'idle',
    'LOADING': 'loading',
    'SUCCEEDED': 'succeeded',
    'FAILED': 'failed'
})

const initialState = {
    customers: [],
    customer: {},
    status: customerStateStatus.IDLE, // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    try {
        console.log("customers fetching");
        const res = await ApiService.getCustomers();
        const customers = await res.data;
        return customers;
    } catch (error) {
        console.log("error fetching customers", error);
        throw error;
    }
});


const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers: (state, action) => {
            console.log("setCustomers", action.payload);
            state.customers.push(...action.payload);
        },
        setCustomer: (state, action) => {
            const customer = action.payload;
            state.customer = customer;
        },

        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCustomers.pending, (state, action) => {
            state.status = customerStateStatus.LOADING;
        })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = customerStateStatus.SUCCEEDED;
                console.log("in add case fulfillment", action.payload);
                state.customers = state.customers.concat(action.payload);
            })

            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = customerStateStatus.FAILED;
                console.log("in add case fulfillment", action.payload);
                state.error.push(action.error.message);
            })
    }
});

export const { setCustomers, addCustomer } = customerSlice.actions;
export default customerSlice.reducer;