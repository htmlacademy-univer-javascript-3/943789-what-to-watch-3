import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main/main-page';
import SignInPage from './sign-in/sign-in-page';
import MyListPage from './my-list/my-list-page';
import FilmPage from './film/film-page';
import AddReviewPage from './review/add-review-page';
import PlayerPage from './player/player-page';
import NotFoundPage from './system/not-found-page';
import AuthRequired from './system/auth-protected';
import { IFilmManager } from '../interfaces/film-manager';
import { FilmInfo } from '../data/films/film-info';

type AppServices = {
  filmManager: IFilmManager;
}

function AuthProtectedMyList({films} : {films: FilmInfo[]}) {
  return (
    <AuthRequired>
      <MyListPage films={films}/>
    </AuthRequired>
  );
}

export default function App(appServices: AppServices) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage title="The Grand Budapest Hotel" genre="Drama" releaseYear={2014} />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="mylist" element={<AuthProtectedMyList films={appServices.filmManager.getFilms()}/>} />
          <Route path="films/:id" element={<FilmPage filmManager={appServices.filmManager}/>}/>
          <Route path="films/:id/review" element={<AddReviewPage filmManager={appServices.filmManager}/>} />
          <Route path="player/:id" element={<PlayerPage filmManager={appServices.filmManager}/>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
