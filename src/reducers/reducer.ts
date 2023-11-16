import { createReducer } from '@reduxjs/toolkit';
import { changeFilterGenreAction } from '../actions/action';
import { filmStorage } from '../mocks/film';
import { Store } from '../store';
import { GenresFilter } from '../data/films/genres-filter';


const initialStore: Store = {
  genreFilter: GenresFilter.All,
  films: filmStorage
};

export const filmReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(changeFilterGenreAction, (state, action) => {
      state.genreFilter = action.payload;

      const allFilms = filmStorage;

      if (state.genreFilter === GenresFilter.All) {
        state.films = allFilms;
        return;
      }

      state.films = allFilms.filter((film) => film.genre === state.genreFilter);
    });
});
