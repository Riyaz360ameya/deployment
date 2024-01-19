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
import leadSlice from './teamLead/leadSlice';
import leadProSlice from './teamLead/leadProSlice';
import developerSlice from './developer/developerSlice';
import developerProSlice from './developer/developerProSlice';

const persistConfig = {
    key: 'root',
    timeout: 500,
    // version: 1,
    storage,
    whitelist: ['user','pm','pmProjects','lead','leadTasks','developer','devloperTaskUpdates']
};

const rootReducer = combineReducers({
    user: userSlice,
    userProjects: userProSlice,
    pm: pmSlice,
    pmProjects: pmProSlice,
    lead:leadSlice,
    leadTasks:leadProSlice,
    developer:developerSlice,
    devloperTaskUpdates:developerProSlice,
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