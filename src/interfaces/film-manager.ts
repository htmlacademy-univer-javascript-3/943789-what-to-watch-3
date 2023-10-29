import { FilmInfo } from '../data/films/film-info';
import { FilmRatingInfo } from '../data/films/film-rating-info';

export interface IFilmManager {
  getFilms(): FilmInfo[];
  getFilmOrNull(id: number | string): FilmInfo | null;
  getFilmRatingOrNull(id: number | string): FilmRatingInfo | null;
}
