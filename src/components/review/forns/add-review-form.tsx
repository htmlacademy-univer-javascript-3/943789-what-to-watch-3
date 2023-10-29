import React from 'react';

export default function AddReviewForm() {
  const [formData, setFormData] = React.useState({
    rating: '',
    'review-text': ''
  });

  const handleFieldChange = (evt : React.SyntheticEvent) => {
    const { name, value } = evt.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const ratingOptions = [...Array(10).keys()].reverse();

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {ratingOptions.map((rating) =>
            (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} onChange={handleFieldChange}/>
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
