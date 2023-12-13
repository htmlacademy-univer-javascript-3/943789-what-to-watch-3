import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from '../store';
import { updateAuthStatus, setLoadingStatus as setLoadedStatus, setFilms, updateUserInfo, setCurrentFilm, setSimilarFilms, setCommentsForCurrent } from '../store/action';
import { FilmInfo } from '../data/films/film-info';
import { AuthStatus } from '../auth/auth-status';
import { UserInfo } from '../auth/user-info';
import { AuthData } from '../auth/auth-data';
import { EnrichedFilmInfo } from '../data/films/enriched-film-info';
import { CommentInfo } from '../data/comments/comment-info';
import { CommentToCreate } from '../data/comments/comment-to-create';

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
    dispatch(setFilms(data));
  },
);

export const fetchFilmById = createAsyncThunk<void, string, ThunkContext>(
  'films/fetchFilmById',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<EnrichedFilmInfo>(`/films/${id}`);
      dispatch(setCurrentFilm(data));
    } catch {
      dispatch(setCurrentFilm(undefined));
    }
  },
);

export const fetchSimilarFilmById = createAsyncThunk<void, string, ThunkContext>(
  'films/fetchSimilarFilmById',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FilmInfo[]>(`/films/${id}/similar`);
      dispatch(setSimilarFilms(data));
    } catch {
      dispatch(setSimilarFilms(undefined));
    }
  },
);

export const fetchCommentsByFilmId = createAsyncThunk<void, string, ThunkContext>(
  'comments/fetchByFilmId',
  async (filmId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<CommentInfo[]>(`/comments/${filmId}`);
      dispatch(setCommentsForCurrent(data));
    } catch {
      dispatch(setCommentsForCurrent(undefined));
    }
  },
);

export const addCommentToFilmById = createAsyncThunk<void, CommentToCreate, ThunkContext>(
  'comments/addToFilmById',
  async ({filmId, comment, rating}, { extra: api }) => {
    try {
      await api.post(`/comments/${filmId}`, {comment, rating});
    } catch { /* empty */ }
  }
);

export const verifyAuth = createAsyncThunk<void, undefined, ThunkContext>(
  'auth/verify',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserInfo>('/login');
      dispatch(updateAuthStatus(AuthStatus.Authorithed));
      dispatch(updateUserInfo(data));
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
      const { data } = await api.post<UserInfo>('/login', authData);
      dispatch(updateAuthStatus(AuthStatus.Authorithed));
      dispatch(updateUserInfo(data));
      api.defaults.headers.common['X-Token'] = data.token;
    } catch {
      dispatch(updateAuthStatus(AuthStatus.AuthRequired));
      dispatch(updateUserInfo(undefined));
    }
  }
);
