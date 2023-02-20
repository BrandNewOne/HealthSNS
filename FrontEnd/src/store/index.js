// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'

// import tokenReducer from './Atk';
// import userReducer from './User';

// const rootReducer = combineReducers({
//     authToken : tokenReducer,
//     authUser : userReducer
// });

// export const store = configureStore({
//     reducer: rootReducer
// });

// const persistConfig = {
//     key: 'root',
//     storage
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

// export const persistor = persistStore(store);
// export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tokenReducer from './Atk';
import userReducer from './User';
import imageReducer from './ImageFile';

const rootReducer = combineReducers({
    authToken : tokenReducer,
    authUser : userReducer,
    imageFile : imageReducer
})

const store = configureStore({
    reducer: rootReducer,
});

export default store;