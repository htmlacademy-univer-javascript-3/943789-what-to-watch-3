import { createAction } from '@reduxjs/toolkit';

export enum FilmActions {
  ChangeFilterGenre = 'CHANGE_FILTER_GENRE',
  FilterFilms = 'FILTER_FILMS'
}

export const filterFilms = createAction(FilmActions.FilterFilms);

export const changeFilterGenreAction = createAction(FilmActions.ChangeFilterGenre, (newGenre: string) => ({
  payload: newGenre
}));
