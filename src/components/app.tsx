import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main-page/main-page';
import SignInPage from './sign-in-page/sign-in-page';
import MyListPage from './my-list-page/my-list-page';
import ReviewPage from './review-page/review-page';
import PlayerPage from './player-page/player-page';
import NotFoundPage from './system/not-found-page';
import AuthRequired from './system/auth-protected';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Spinner } from './system/spinner';
import { selectLoadedStatus } from '../stores/films/films-selectors';
import { useEffect } from 'react';
import { fetchFavoritesFilms, fetchFilms, verifyAuth } from '../api/api-actions';
import { selectAuthorizationStatus } from '../stores/auth/auth-selectors';
import { AuthStatus } from '../data/auth/auth-status';
import FilmPage from './film-page/film-page';

export default function App() {
  const dispath = useAppDispatch();
  const loaded = useAppSelector(selectLoadedStatus);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    dispath(fetchFilms());
    dispath(verifyAuth());
  }, [dispath]);

  useEffect(() => {
    if (authStatus === AuthStatus.Authorithed) {
      dispath(fetchFavoritesFilms());
    }
  }, [dispath, authStatus]);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="mylist" element={
            <AuthRequired>
              <MyListPage />
            </AuthRequired>
          }
          />
          <Route path="films/:id" element={<FilmPage />} />
          <Route path="films/:id/review" element={
            <AuthRequired>
              <ReviewPage />
            </AuthRequired>
          }
          />
          <Route path="player/:id" element={<PlayerPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
