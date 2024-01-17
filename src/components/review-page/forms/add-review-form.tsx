import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addCommentToFilmById } from '../../../api/api-actions';
import { useNavigate } from 'react-router-dom';
import { selectCurrentFilm } from '../../../stores/current-film/current-film-selectors';
import React from 'react';

type FormData = {
  rating: string;
  'review-text': string;
}

function validateFormData(formData: FormData) {
  const rating = parseInt(formData.rating, 10);

  if (isNaN(rating) || rating < 1 || rating > 1000) {
    return false;
  }

  if (formData['review-text'].length < 50 || formData['review-text'].length > 400) {
    return false;
  }

  return true;
}

export default function AddReviewForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    rating: '0',
    'review-text': ''
  });

  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [reviewErrorMessage, setReviewErrorMessage] = useState<string | undefined>();

  const filmId = useAppSelector(selectCurrentFilm)?.id;

  if (filmId === undefined) {
    return null;
  }


  const handleFieldChange = (evt: React.SyntheticEvent) => {
    const { name, value } = evt.target as HTMLInputElement;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setReviewErrorMessage(undefined);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formDataToSend = {...formData};

    const rating = parseInt(formDataToSend.rating, 10);
    setFormDisabled(true);
    dispatch(addCommentToFilmById({ comment: formDataToSend['review-text'], rating: rating, filmId: filmId }))
      .unwrap()
      .then(() => {
        navigate(`/films/${filmId}`);
      })
      .catch((reason: string) => {
        setReviewErrorMessage(reason);
      });

    setFormDisabled(false);
  };

  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      {reviewErrorMessage}

      <div className="rating">
        <div className="rating__stars">
          {ratingOptions.map((rating) =>
            (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" disabled={formDisabled} value={rating} onChange={handleFieldChange} />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            )
          )}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" disabled={formDisabled} name="review-text" id="review-text" placeholder="Review text" onChange={handleFieldChange}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" disabled={!validateFormData(formData) || formDisabled} type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}
