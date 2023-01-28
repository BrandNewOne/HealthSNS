import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tokenReducer from './Atk';
import userReducer from './User';
import imageReducer from './ImageFile';

const rootReducer = combineReducers({
    authToken : tokenReducer,
    authUser : userReducer,
    imageFile : imageReducer
})

export const store = configureStore({
    reducer: rootReducer,
});