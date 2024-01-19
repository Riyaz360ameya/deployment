// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userSlice from './users/userSlice';
// import userProSlice from './users/userProSlice';
// import persistStore from 'redux-persist/es/persistStore';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   user: userSlice,
//   userProjects: userProSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });
// const persister = persistStore(store);
// export { store, persister };





// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userSlice from './users/userSlice';
// import userProSlice from './users/userProSlice';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   whitelist: ['userProjects', 'user']
// };
// const reducer = combineReducers({
//   user: userSlice,
//   userProjects: userProSlice,
// })
// const persistedReducer = persistReducer(persistConfig, reducer);
// const store = configureStore({
//   reducer: persistedReducer
// });
// const persister = persistStore(store);
// export { store, persister };

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './users/userSlice'
import userProSlice from './users/userProSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import pmSlice from './projectManager/pmSlice';
import pmProSlice from './projectManager/pmProSlice';

const persistConfig = {
    // version: 1,
    timeout: 500,
    key: 'root',
    storage,
    whitelist: ['user','pm','pmProjects']
};

const rootReducer = combineReducers({
    user: userSlice,
    userProjects: userProSlice,
    pm: pmSlice,
    pmProjects: pmProSlice,
},)
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

let persistor = persistStore(store)
export { store, persistor };