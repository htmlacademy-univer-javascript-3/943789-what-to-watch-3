import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { FilmInfo } from '../data/films/film-info';
import { AuthStatus } from '../data/auth/auth-status';
import { UserInfo } from '../data/auth/user-info';
import { AuthData } from '../data/auth/auth-data';
import { EnrichedFilmInfo } from '../data/films/enriched-film-info';
import { CommentInfo } from '../data/comments/comment-info';
import { CommentToCreate } from '../data/comments/comment-to-create';
import { PromoFilmInfo } from '../data/films/promo-film-info';
import { AppDispatch, RootState } from '../stores';
import { updateAuthError, updateAuthStatus, updateUserInfo } from '../stores/auth/auth-actions';
import { setCurrentFilm, setSimilarFilms, setCommentsForCurrent } from '../stores/current-film/current-film-actions';
import { setFilms, setGenres, setLoadingStatus as setLoadedStatus, setPromoFilm } from '../stores/films/films-actions';
import { Headers } from './headers';
import { AuthError } from '../data/auth/auth-error';
import { addToFavorites, removeFromFavoritesById, updateFavorites } from '../stores/favorites/favorites-action';
import { FavoriteStatus, FavoriteStatusInfo } from '../data/films/favorite-status-info';
import { FullFilmInfo } from '../data/films/full-film-info';
import { ApiError } from '../data/api-common/api-error';
import { setServerAvaible } from '../stores/system/system-actions';

type ThunkContext = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}

export const fetchFilms = createAsyncThunk<void, undefined, ThunkContext>(
  'films/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadedStatus(false));
    try {
      const { data } = await api.get<FilmInfo[]>('/films');
      const genres = [...new Set(data.map((film) => film.genre))];
      dispatch(setFilms(data));
      dispatch(setGenres(genres));
      dispatch(setLoadedStatus(true));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setServerAvaible(false));
    }
  },
);

export const fetchFilmById = createAsyncThunk<void, string, ThunkContext>(
  'films/fetchFilmById',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<EnrichedFilmInfo>(`/films/${id}`);
      dispatch(setCurrentFilm(data));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setCurrentFilm(undefined));
      dispatch(setServerAvaible(false));
    }
  },
);

export const fetchSimilarFilmById = createAsyncThunk<void, string, ThunkContext>(
  'films/fetchSimilarFilmById',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FilmInfo[]>(`/films/${id}/similar`);
      dispatch(setSimilarFilms(data));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setSimilarFilms(undefined));
      dispatch(setServerAvaible(false));
    }
  },
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, ThunkContext>(
  'films/fetchPromoFilm',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<PromoFilmInfo>('/promo');
      dispatch(setPromoFilm(data));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setServerAvaible(false));
    }
  },
);

export const fetchCommentsByFilmId = createAsyncThunk<void, string, ThunkContext>(
  'comments/fetchByFilmId',
  async (filmId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<CommentInfo[]>(`/comments/${filmId}`);
      dispatch(setCommentsForCurrent(data));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setCommentsForCurrent(undefined));
      dispatch(setServerAvaible(false));
    }
  },
);

export const addCommentToFilmById = createAsyncThunk<void, CommentToCreate, ThunkContext>(
  'comments/addToFilmById',
  async ({ filmId, comment, rating }, { rejectWithValue, extra: api }) => {
    try {
      await api.post(`/comments/${filmId}`, { comment, rating });
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        return rejectWithValue('Unknown message');
      } else {
        const apiError = err.response?.data as ApiError;

        return rejectWithValue(apiError.message);
      }
    }
  }
);

export const fetchFavoritesFilms = createAsyncThunk<void, undefined, ThunkContext>(
  'favorites/get',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FilmInfo[]>('/favorite');
      dispatch(updateFavorites(data));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setServerAvaible(false));
    }
  }
);

export const changeFavoriteStatus = createAsyncThunk<void, FavoriteStatusInfo, ThunkContext>(
  'favorites/changeStatus',
  async ({ filmId, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<FullFilmInfo>(`/favorite/${filmId}/${status}`);

      if (status === FavoriteStatus.ToWatch) {
        dispatch(addToFavorites(data));
      } else {
        dispatch(removeFromFavoritesById(filmId));
      }
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(setServerAvaible(false));
    }
  }
);

export const verifyAuth = createAsyncThunk<void, undefined, ThunkContext>(
  'auth/verify',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserInfo>('/login');
      dispatch(updateAuthStatus(AuthStatus.Authorithed));
      dispatch(updateUserInfo(data));
      dispatch(setServerAvaible(true));
    } catch {
      dispatch(updateAuthStatus(AuthStatus.AuthRequired));
      dispatch(updateUserInfo(undefined));
      dispatch(setServerAvaible(false));
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
      dispatch(updateAuthError(undefined));
      dispatch(setServerAvaible(true));
      api.defaults.headers.common[Headers.AuthHeader] = data.token;
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        dispatch(setServerAvaible(false));
        return;
      }

      const authError = err.response?.data as AuthError;

      if (authError !== null) {
        dispatch(updateAuthError(authError));
      } else {
        dispatch(updateAuthError(undefined));
        dispatch(setServerAvaible(false));
      }
      dispatch(updateAuthStatus(AuthStatus.AuthRequired));
      dispatch(updateUserInfo(undefined));
    }
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkContext>(
  'auth/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');

    delete api.defaults.headers.common[Headers.AuthHeader];

    dispatch(updateUserInfo(undefined));
    dispatch(updateAuthStatus(AuthStatus.AuthRequired));
  }
);
