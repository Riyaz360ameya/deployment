// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import projectDetail from './userSlice';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   app: projectDetail,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer, 
// });


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './users/userSlice';
import userProSlice from './users/userProSlice';
import leadSlice from './teamLead/leadSlice';
import leadProSlice from './teamLead/leadProSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['userProjects', 'user','lead','leadProjects','developers','developersProjects']
};
const reducer = combineReducers({
  user: userSlice,
  userProjects: userProSlice,
  lead: leadSlice,
  leadProjects: leadProSlice,
})
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer
});
const persister = persistStore(store);
export { store, persister };

