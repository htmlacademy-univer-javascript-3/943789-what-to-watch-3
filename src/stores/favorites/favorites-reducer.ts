import { createReducer } from '@reduxjs/toolkit';
import { FilmInfo } from '../../data/films/film-info';
import { addToFavorites, removeFromFavoritesById, updateFavorites } from './favorites-action';

type Store = {
  favorites: FilmInfo[];
}

const initialStore: Store = {
  favorites: []
};

export const favoritesReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(updateFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(addToFavorites, (state, action) => {
      state.favorites.push(action.payload);
    })
    .addCase(removeFromFavoritesById, (state, action) => {
      state.favorites = state.favorites.filter((film) => film.id !== action.payload);
    });
});
