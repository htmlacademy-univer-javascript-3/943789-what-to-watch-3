import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../../data/films/film-info';

export const updateFavorites = createAction<FilmInfo[]>('favorites/set');

export const addToFavorites = createAction<FilmInfo>('favorites/add');

export const removeFromFavoritesById = createAction<string>('favorites/removeById');
