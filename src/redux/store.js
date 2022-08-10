import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from 'redux/contacts/contactsApi';
import { combineReducers } from 'redux'
import {filterSlice} from "./filter/filter-slice";

export const rootReducer = combineReducers({
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    rootReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);