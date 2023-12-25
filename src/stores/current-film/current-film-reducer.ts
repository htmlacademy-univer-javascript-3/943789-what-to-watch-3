import { createReducer } from '@reduxjs/toolkit';
import { CommentInfo } from '../../data/comments/comment-info';
import { EnrichedFilmInfo } from '../../data/films/enriched-film-info';
import { FilmInfo } from '../../data/films/film-info';
import { setCommentsForCurrent, setCurrentFilm, setSimilarFilms } from './current-film-actions';

type Store = {
  currentFilm: EnrichedFilmInfo | undefined;
  similarFilms: FilmInfo[] | undefined;
  commentsToCurrentFilm: CommentInfo[] | undefined;
}

const initialStore: Store = {
  currentFilm: undefined,
  similarFilms: undefined,
  commentsToCurrentFilm: undefined
};

export const currentFilmReducer = createReducer(initialStore, (builder) => {
  builder
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
