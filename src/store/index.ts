import { configureStore } from '@reduxjs/toolkit';
import { filmReducer } from './reducer';
import { createAPIClient } from '../api/api';

const apiClient = createAPIClient();

export const store = configureStore({
  reducer: filmReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiClient
      }
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
