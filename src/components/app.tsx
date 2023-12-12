import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main/main-page';
import SignInPage from './sign-in/sign-in-page';
import MyListPage from './my-list/my-list-page';
import FilmPage from './film/film-page';
import AddReviewPage from './review/add-review-page';
import PlayerPage from './player/player-page';
import NotFoundPage from './system/not-found-page';
import AuthRequired from './system/auth-protected';
import { useAppSelector } from '../hooks';
import { Spinner } from './system/spinner';

export default function App() {
  const loaded = useAppSelector((store) => store.filmsLoaded);
  const films = useAppSelector((store) => store.allFilms);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage title="The Grand Budapest Hotel" genre="Drama" releaseYear={2014} />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="mylist" element={
            <AuthRequired>
              <MyListPage films={films} />
            </AuthRequired>
          }
          />
          <Route path="films/:id" element={<FilmPage />} />
          <Route path="films/:id/review" element={
            <AuthRequired>
              <AddReviewPage />
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
