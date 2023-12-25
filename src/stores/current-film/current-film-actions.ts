import { createAction } from '@reduxjs/toolkit';
import { CommentInfo } from '../../data/comments/comment-info';
import { EnrichedFilmInfo } from '../../data/films/enriched-film-info';
import { FilmInfo } from '../../data/films/film-info';

export const setCurrentFilm = createAction<EnrichedFilmInfo | undefined>('current-film/set');

export const setSimilarFilms = createAction<FilmInfo[] | undefined>('current-film/set-similar');

export const setCommentsForCurrent = createAction<CommentInfo[] | undefined>('current-film/set-comments');
