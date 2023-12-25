import { RootState } from '..';
import { ReducerTypes } from '../reducer';

export const selectAuthorizationStatus = (state: RootState) => state[ReducerTypes.Auth].authorizationStatus;

export const selectUserInfo = (state: RootState) => state[ReducerTypes.Auth].userInfo;

export const selectAuthError = (state: RootState) => state[ReducerTypes.Auth].authError;
