import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../data/auth/auth-status';
import { UserInfo } from '../../data/auth/user-info';
import { AuthError } from '../../data/auth/auth-error';

export const updateAuthStatus = createAction<AuthStatus>('auth-status/update');

export const updateUserInfo = createAction<UserInfo | undefined>('user-info/update');

export const updateAuthError = createAction<AuthError | undefined>('auth-error/update');
