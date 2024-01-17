import { createReducer } from '@reduxjs/toolkit';
import { setServerAvaible } from './system-actions';

type Store = {
  serverAvaible: boolean;
};

const initialValue: Store = {
  serverAvaible: true,
};

export const systemReducer = createReducer(initialValue, (builder) => {
  builder.addCase(setServerAvaible, (state, action) => {
    state.serverAvaible = action.payload;
  });
});
