import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../data/films/film-info';
import { AuthStatus } from '../auth/auth-status';
import { UserInfo } from '../auth/user-info';

export const filterFilms = createAction('films/filter');

export const uploadFilms = createAction('films/upload', (films: FilmInfo[]) => ({
  payload: films
}));

export const setLoadingStatus = createAction('loading-status/set', (loaded: boolean) => ({
  payload: loaded
}));

export const changeFilterGenreAction = createAction('filter-genre/change', (newGenre: string) => ({
  payload: newGenre
}));

export const updateAuthStatus = createAction<AuthStatus>('auth-status/update');

export const updateUserInfo = createAction<UserInfo | undefined>('user-info/update');
