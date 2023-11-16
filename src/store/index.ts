import { configureStore } from '@reduxjs/toolkit';
import { filmReducer } from '../reducers/reducer';
import { FilmInfo } from '../data/films/film-info';

export type Store = {
  genreFilter: string;
  films: FilmInfo[];
}

export const filterGenreStore = configureStore({
  reducer: filmReducer
});

export type RootState = ReturnType<typeof filterGenreStore.getState>
export type AppDispatch = typeof filterGenreStore.dispatch
