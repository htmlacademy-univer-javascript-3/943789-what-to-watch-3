import { RootState } from '..';
import { ReducerTypes } from '../reducer';

export const selectCurrentFilm = (state: RootState) => state[ReducerTypes.CurrentFilm].currentFilm;

export const selectCommentsToCurrent = (state: RootState) => state[ReducerTypes.CurrentFilm].commentsToCurrentFilm;

export const selectSimilarFilms = (state: RootState) => state[ReducerTypes.CurrentFilm].similarFilms;
