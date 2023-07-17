/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: localStorage.getItem('auth') ? true : false,
    auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {
        user: null,
        isAuth: false
    },
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { data } = action.payload;
            localStorage.setItem('auth', JSON.stringify(data));
            state = {
                isAuth: true,
                auth: data
            }
            return state;
        },
        removeAuth: (state) => {
            localStorage.removeItem('auth');
            state = {
                isAuth: false,
                auth: null
            }
            return state;
        }
    }
})

export const { setAuth, removeAuth } = userSlice.actions;
export default userSlice.reducer;