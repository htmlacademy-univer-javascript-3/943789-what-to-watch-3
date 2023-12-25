import { RootState } from '..';
import { ReducerTypes } from '../reducer';

export const selectAllFilms = (state: RootState) => state[ReducerTypes.Films].allFilms;

export const selectFilteredFilms = (state: RootState) => state[ReducerTypes.Films].filteredFilms;

export const selectCurrentGenre = (state: RootState) => state[ReducerTypes.Films].currentGenre;

export const selectGenres = (state: RootState) => state[ReducerTypes.Films].genres;

export const selectLoadedStatus = (state: RootState) => state[ReducerTypes.Films].filmsLoaded;

export const selectPromoFilm = (state: RootState) => state[ReducerTypes.Films].promoFilm;
