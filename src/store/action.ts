import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../data/films/film-info';
import { AuthStatus } from '../auth/auth-status';
import { UserInfo } from '../auth/user-info';
import { EnrichedFilmInfo } from '../data/films/enriched-film-info';
import { CommentInfo } from '../data/comments/comment-info';

export const filterFilms = createAction('films/filter');

export const setFilms = createAction<FilmInfo[]>('films/upload');

export const setCurrentFilm = createAction<EnrichedFilmInfo | undefined>('films/set-current');

export const setSimilarFilms = createAction<FilmInfo[] | undefined>('films/set-similar');

export const setCommentsForCurrent = createAction<CommentInfo[] | undefined>('films/current/set-comments');

export const setLoadingStatus = createAction<boolean>('loading-status/set');

export const changeFilterGenreAction = createAction<string>('filter-genre/change');

export const updateAuthStatus = createAction<AuthStatus>('auth-status/update');

export const updateUserInfo = createAction<UserInfo | undefined>('user-info/update');

