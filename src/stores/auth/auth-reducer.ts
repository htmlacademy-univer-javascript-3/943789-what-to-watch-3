import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../../data/auth/auth-status';
import { UserInfo } from '../../data/auth/user-info';
import { updateAuthError, updateAuthStatus, updateUserInfo } from './auth-actions';
import { AuthError } from '../../data/auth/auth-error';

type Store = {
  authorizationStatus: AuthStatus;
  userInfo?: UserInfo;
  authError?: AuthError;
}

const initialStore: Store = {
  authorizationStatus: AuthStatus.AuthRequired
};

export const authReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(updateAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(updateUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(updateAuthError, (state, action) => {
      state.authError = action.payload;
    });
});
