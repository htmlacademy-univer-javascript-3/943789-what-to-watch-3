import { createReducer } from '@reduxjs/toolkit';
import { FilmInfo } from '../../data/films/film-info';
import { filterFilms, setFilms, setCurrentGenre, setGenres, setLoadingStatus, setPromoFilm } from './films-actions';
import { PromoFilmInfo } from '../../data/films/promo-film-info';
import { AllGenresFilter } from '../../data/consts/all-genres-filter';

type Store = {
  genres: string[];
  currentGenre: string;
  filteredFilms: FilmInfo[];
  allFilms: FilmInfo[];
  filmsLoaded: boolean;
  promoFilm: PromoFilmInfo | undefined;
};

const initialStore: Store = {
  genres: [],
  currentGenre: AllGenresFilter,
  filteredFilms: [],
  allFilms: [],
  filmsLoaded: false,
  promoFilm: undefined
};

export const filmsReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(filterFilms, (state) => {
      if (state.currentGenre === AllGenresFilter) {
        state.filteredFilms = state.allFilms;
        return;
      }

      state.filteredFilms = state.allFilms.filter((film) => film.genre === state.currentGenre);
    })
    .addCase(setFilms, (state, action) => {
      state.allFilms = action.payload;
    })
    .addCase(setGenres, (state, action) => {
      state.genres = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.filmsLoaded = action.payload;
    })
    .addCase(setCurrentGenre, (state, action) => {
      state.currentGenre = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    });
});
