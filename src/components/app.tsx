import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main/main-page';
import SignInPage from './sign-in/sign-in-page';
import MyListPage from './my-list/my-list-page';
import MoviePage from './movie/movie-page';
import AddReviewPage from './review/add-review-page';
import PlayerPage from './player/player-page';
import NotFoundPage from './system/not-found-page';
import AuthRequired from './system/auth-protected';

function AuthProtectedMyList() {
  return (
    <AuthRequired>
      <MyListPage />
    </AuthRequired>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage title="The Grand Budapest Hotel" genre="Drama" releaseYear={2014} />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="mylist" element={<AuthProtectedMyList />} />
          <Route path="films/:id" element={<MoviePage />}/>
          <Route path="films/:id/review" element={<AddReviewPage />} />
          <Route path="player/:id" element={<PlayerPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
