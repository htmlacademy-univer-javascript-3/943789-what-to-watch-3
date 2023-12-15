import { createReducer } from '@reduxjs/toolkit';
import { changeFilterGenreAction, filterFilms, updateAuthStatus, setLoadingStatus, setFilms, updateUserInfo, setCurrentFilm, setSimilarFilms, setCommentsForCurrent } from './action';
import { FilmInfo } from '../data/films/film-info';
import { AuthStatus } from '../auth/auth-status';
import { UserInfo } from '../auth/user-info';
import { EnrichedFilmInfo } from '../data/films/enriched-film-info';
import { CommentInfo } from '../data/comments/comment-info';

const AllGenresFilter = 'All genres';


export type Store = {
  genre: string;
  filteredFilms: FilmInfo[];
  allFilms: FilmInfo[];
  filmsLoaded: boolean;
  authorizationStatus: AuthStatus;
  userInfo: UserInfo | undefined;
  currentFilm: EnrichedFilmInfo | undefined;
  similarFilms: FilmInfo[] | undefined;
  commentsToCurrentFilm: CommentInfo[] | undefined;
}

const initialStore: Store = {
  genre: AllGenresFilter,
  filteredFilms: [],
  allFilms: [],
  filmsLoaded: false,
  authorizationStatus: AuthStatus.AuthRequired,
  userInfo: undefined,
  currentFilm: undefined,
  similarFilms: undefined,
  commentsToCurrentFilm: undefined
};

export const reducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(setLoadingStatus, (state, action) => {
      state.filmsLoaded = action.payload;
    })
    .addCase(setFilms, (state, action) => {
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
    })
    .addCase(updateAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(updateUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setCommentsForCurrent, (state, action) => {
      state.commentsToCurrentFilm = action.payload;
    });
});
