import { RootState } from '..';
import { ReducerTypes } from '../reducer';

export const selectFavorites = (store: RootState) => store[ReducerTypes.Favorites].favorites;
