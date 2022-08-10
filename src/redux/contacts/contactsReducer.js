import { createReducer } from '@reduxjs/toolkit';
import { filterContacts } from './contactsActions';

export const filter = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});