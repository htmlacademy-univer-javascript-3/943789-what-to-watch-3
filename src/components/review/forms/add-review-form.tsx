import React, { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addCommentToFilmById } from '../../../api/api-actions';
import { useNavigate } from 'react-router-dom';

type FormData = {
  rating: string;
  'review-text': string;
}

function validateFormData(formData: FormData) {
  const rating = parseInt(formData.rating, 10);

  if (isNaN(rating) || rating < 1 || rating > 10) {
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

  const [formData, setFormData] = React.useState<FormData>({
    rating: '0',
    'review-text': ''
  });

  const filmId = useAppSelector((store) => store.currentFilm?.id);

  if (filmId === undefined) {
    return null;
  }


  const handleFieldChange = (evt: React.SyntheticEvent) => {
    const { name, value } = evt.target as HTMLInputElement;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formDataToSend = {...formData};

    if (!validateFormData(formDataToSend)) {
      return;
    }

    const rating = parseInt(formDataToSend.rating, 10);
    dispatch(addCommentToFilmById({ comment: formDataToSend['review-text'], rating: rating, filmId: filmId }));
    navigate(`/films/${filmId}`);
  };

  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {ratingOptions.map((rating) =>
            (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} onChange={handleFieldChange} />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            )
          )}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleFieldChange}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}
