import { createReducer } from '@reduxjs/toolkit';
import { changeFilterGenreAction, filterFilms, setLoadingStatus, uploadFilms } from './action';
import { FilmInfo } from '../data/films/film-info';

const AllGenresFilter = 'All genres';


export type Store = {
  genre: string;
  filteredFilms: FilmInfo[];
  allFilms: FilmInfo[];
  filmsLoaded: boolean;
}

const initialStore: Store = {
  genre: AllGenresFilter,
  filteredFilms: [],
  allFilms: [],
  filmsLoaded: false
};

export const filmReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(setLoadingStatus, (state, action) => {
      state.filmsLoaded = action.payload;
    })
    .addCase(uploadFilms, (state, action) => {
      state.allFilms = action.payload;
    })
    .addCase(changeFilterGenreAction, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(filterFilms, (state) => {
      const allFilms = state.allFilms;

      if (state.genre === AllGenresFilter) {
        state.filteredFilms = allFilms;
        return;
      }

      state.filteredFilms = allFilms.filter((film) => film.genre === state.genre);
    });
});
