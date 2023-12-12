import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from '../store';
import { updateAuthStatus, setLoadingStatus as setLoadedStatus, uploadFilms, updateUserInfo } from '../store/action';
import { FilmInfo } from '../data/films/film-info';
import { AuthStatus } from '../auth/auth-status';
import { UserInfo } from '../auth/user-info';
import { AuthData } from '../auth/auth-data';

type ThunkContext = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}

export const fetchFilms = createAsyncThunk<void, undefined, ThunkContext>(
  'films/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadedStatus(false));
    const { data } = await api.get<FilmInfo[]>('/films');
    dispatch(setLoadedStatus(true));
    dispatch(uploadFilms(data));
  },
);

export const verifyAuth = createAsyncThunk<void, undefined, ThunkContext>(
  'auth/verify',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const responce = await api.get<UserInfo>('/login');
      dispatch(updateAuthStatus(AuthStatus.Authorithed));
      dispatch(updateUserInfo(responce.data));
    } catch {
      dispatch(updateAuthStatus(AuthStatus.AuthRequired));
      dispatch(updateUserInfo(undefined));
    }
  }
);

export const getAuthData = createAsyncThunk<void, AuthData, ThunkContext>(
  'auth/getData',
  async (authData, { dispatch, extra: api }) => {
    try {
      const responce = await api.post<UserInfo>('/login', authData);
      dispatch(updateAuthStatus(AuthStatus.Authorithed));
      dispatch(updateUserInfo(responce.data));
      api.defaults.headers.common['X-Token'] = responce.data.token;
    } catch {
      dispatch(updateAuthStatus(AuthStatus.AuthRequired));
      dispatch(updateUserInfo(undefined));
    }
  }
);
