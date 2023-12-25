import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../../data/films/film-info';
import { PromoFilmInfo } from '../../data/films/promo-film-info';

export const filterFilms = createAction('films/filter');

export const setFilms = createAction<FilmInfo[]>('films/upload');

export const setGenres = createAction<Set<string>>('genres/upload');

export const setLoadingStatus = createAction<boolean>('loading-status/set');

export const setCurrentGenre = createAction<string>('current-genre/set');

export const setPromoFilm = createAction<PromoFilmInfo>('films/promo/set');
