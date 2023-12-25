import { Link } from 'react-router-dom';
import { FilmInfo } from '../../data/films/film-info';
import FilmCardsList from '../film-list/film-cards-list';
import { Header } from '../layout/header';

export default function MyListPage({films} : {films: FilmInfo[]}) {
  return (
    <div>
      <div className="user-page">
        <Header>
          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        </Header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <FilmCardsList films={films} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
