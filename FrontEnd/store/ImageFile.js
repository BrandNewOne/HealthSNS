import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'imageFile',
    initialState: {
        fileList: null
    },
    reducers: {
        SET_ImageFileList: (state, action) => {
            state.fileList = action.payload;
        },
        DELETE_ImageFileList: (state) => {
            state.fileList = null;
        },
    }
})

export const { SET_ImageFileList, DELETE_ImageFileList} = tokenSlice.actions;

export default tokenSlice.reducer;