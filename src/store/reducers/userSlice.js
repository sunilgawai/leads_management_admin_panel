/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null,
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            // Todo: Store user in auth.
            // localStorage.setItem('auth', JSON.stringify(action.payload))
            // state = {
            //     ...state,
            //     isAuth: true,
            //     auth: action.payload
            // }
        }
    }
})

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;