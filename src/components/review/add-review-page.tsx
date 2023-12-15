import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../system/not-found-page';
import AddReviewForm from './forms/add-review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmById } from '../../api/api-actions';
import { useEffect } from 'react';

export default function AddReviewPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const id = params.id as string;

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilmById(id));
  }, [dispatch, id]);

  const filmInfo = useAppSelector((store) => store.currentFilm);

  if (params.id === undefined || filmInfo === undefined) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={filmInfo.backgroundImage} alt={filmInfo.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={'..'} className="breadcrumbs__link">{filmInfo.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={filmInfo.posterImage} alt={filmInfo.name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <AddReviewForm />
        </div>

      </section>
    </div>
  );
}
