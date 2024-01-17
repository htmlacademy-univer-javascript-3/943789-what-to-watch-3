import { RootState } from '..';
import { ReducerTypes } from '../reducer';

export const selectServerAvaible = (state: RootState) => state[ReducerTypes.System].serverAvaible;
