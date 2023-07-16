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
            const id = action.payload;  //01c6762c-8ab0-4bfd-8ffe-f5ad3418a015
            // console.log(id, state);
            const customer = state.customers.find((c) => c.id === id);
            // console.log(customer);
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
        builder.addCase(fetchCustomers.pending, (state) => {
            state.status = customerStateStatus.LOADING;
        })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = customerStateStatus.SUCCEEDED;
                state.customers = state.customers.concat(action.payload);
            })

            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = customerStateStatus.FAILED;
                state.error.push(action.error.message);
            })
    }
});

export const { setCustomers, setCustomer } = customerSlice.actions;
export default customerSlice.reducer;