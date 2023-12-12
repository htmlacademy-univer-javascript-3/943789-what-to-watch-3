import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../data/films/film-info';

export enum FilmActions {
  ChangeFilterGenre = 'CHANGE_FILTER_GENRE',
  FilterFilms = 'FILTER_FILMS',
  UploadFilms = 'UPLOAD_FILMS',
  SetLoadingStatus = 'SET_LOADING_STATUS'
}

export const filterFilms = createAction(FilmActions.FilterFilms);

export const uploadFilms = createAction(FilmActions.UploadFilms, (films: FilmInfo[]) => ({
  payload: films
}));

export const setLoadingStatus = createAction(FilmActions.SetLoadingStatus, (loaded: boolean) => ({
  payload: loaded
}));

export const changeFilterGenreAction = createAction(FilmActions.ChangeFilterGenre, (newGenre: string) => ({
  payload: newGenre
}));
