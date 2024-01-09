import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../system/not-found-page';
import AddReviewForm from './forms/add-review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmById } from '../../api/api-actions';
import { useEffect } from 'react';
import { selectCurrentFilm } from '../../stores/current-film/current-film-selectors';
import { Header } from '../layout/header';

export default function ReviewPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const id = params.id as string;

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilmById(id));
  }, [dispatch, id]);

  const filmInfo = useAppSelector(selectCurrentFilm);

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

          <Header>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${filmInfo.id}`} className="breadcrumbs__link">{filmInfo.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

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
