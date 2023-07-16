/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => 'api/customer'
    }),
    getCustomerById: builder.query({
      query: (id) => `api/customer/${id}`
    }),
    storeCustomer: builder.mutation({
      query: (customer) => ({
        url: 'customer',
        method: 'POST',
        body: customer
      })
    }),
    updateCustomer: builder.query({
      query: (id) => `api/customer/${id}`
    })
  })
});

export const { useGetCustomersQuery, useGetCustomerByIdQuery } = customersApi;
