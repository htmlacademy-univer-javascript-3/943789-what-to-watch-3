import { createReducer } from '@reduxjs/toolkit';
import { changeFilterGenreAction, filterFilms } from '../actions/action';
import { filmStorage } from '../mocks/film';
import { Store } from '../store';

const AllGenresFilter = 'All genres';

const initialStore: Store = {
  genre: AllGenresFilter,
  films: filmStorage
};

export const filmReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(changeFilterGenreAction, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(filterFilms, (state) => {
      const allFilms = filmStorage;

      if (state.genre === AllGenresFilter) {
        state.films = allFilms;
        return;
      }

      state.films = allFilms.filter((film) => film.genre === state.genre);
    });
});
