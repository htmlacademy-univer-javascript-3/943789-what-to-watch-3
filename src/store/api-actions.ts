import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from '.';
import { setLoadingStatus as setLoadedStatus, uploadFilms } from './action';
import { FilmInfo } from '../data/films/film-info';

export enum APIRoute {
  Films = '/films',
}

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'films/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadedStatus(false));
    const { data } = await api.get<FilmInfo[]>(APIRoute.Films);
    dispatch(setLoadedStatus(true));
    dispatch(uploadFilms(data));
  },
);
