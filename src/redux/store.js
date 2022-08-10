import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from 'redux/contacts/contactsApi';
import { combineReducers } from 'redux'
import { filter } from "./contacts/contactsReducer";
// import { contactsReducers } from "./contacts/contactsReducer";

// const persistConfig = {
//   key: 'contacts',
//   storage,
//   whitelist: ['items'],
// }

// const persistedReducer = persistReducer(persistConfig, contactsReducers)
export const rootReducer = combineReducers({
  filter
});

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    rootReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

// export const persistor = persistStore(store);
setupListeners(store.dispatch)

// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),