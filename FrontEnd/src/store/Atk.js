import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        authenticated: false,
        accessToken: null,
        expireTime: null
    },
    reducers: {
        SET_ATK_EXP: (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload.atk;
            state.expireTime = action.payload.exp;
        },
        DELETE_ATK: (state) => {
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null
        },
    }
})

export const { SET_ATK_EXP, DELETE_ATK } = tokenSlice.actions;

export default tokenSlice.reducer;