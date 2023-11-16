import { createAction } from '@reduxjs/toolkit';
import { GenresFilter } from '../data/films/genres-filter';

export enum FilmActions {
  ChangeFilterGenre = 'CHANGE_FILTER_GENRE',
  GetFilmsByFilterGenre = 'GET_FILMS_BY_FILTER_GENRE'
}

export const getFilmsByFilterGenre = createAction(FilmActions.GetFilmsByFilterGenre);

export const changeFilterGenreAction = createAction(FilmActions.ChangeFilterGenre, (newFilterGenre: GenresFilter) => ({
  payload: newFilterGenre
}));
