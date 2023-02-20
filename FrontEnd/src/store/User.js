import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'authUser',
    initialState: {
        id: null,
        name: null,
        role: null,
        dump: null
    },
    reducers: {
        SET_DUMP: (state, action) => {
            state.dump = action.payload;
        },
        SET_USER: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.dump = action.payload.dump;
        },
        DELETE_USER: (state) => {
            state.id = null;
            state.name = null;
            state.role = null;
            state.dump = null;
        },
    }
})

export const { SET_USER, SET_DUMP, DELETE_USER } = userSlice.actions;

export default userSlice.reducer;