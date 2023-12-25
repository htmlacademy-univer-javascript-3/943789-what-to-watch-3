import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-reducer';
import { currentFilmReducer } from './current-film/current-film-reducer';
import { filmsReducer } from './films/films-reducer';

export enum ReducerTypes {
  Auth = 'Auth',
  CurrentFilm = 'CurrentFilm',
  Films = 'Films'
}

export const reducer = combineReducers({
  [ReducerTypes.Auth]: authReducer,
  [ReducerTypes.CurrentFilm]: currentFilmReducer,
  [ReducerTypes.Films]: filmsReducer
});
