import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Rating(props) {
    const { rating, numReviews, slug } = props;
    const [userRating, setUserRating] = useState(rating);

    let auth = JSON.parse(localStorage.getItem('userInfo'));
    let authToken;
    if (auth) {
        authToken = auth.token;
    }
    const handleRatingChange = (value, unq) => {
        setUserRating(value);
        axios.patch(`/api/products/${slug}`, { rating: value });
        window.location.reload();
    };

    return (
        <div className="rating">
            <span onClick={() => handleRatingChange(1, slug)}>
                <i className={userRating >= 1 ? 'fas fa-star' : 'far fa-star'} />
            </span>
            <span onClick={() => handleRatingChange(2, slug)}>
                <i className={userRating >= 2 ? 'fas fa-star' : 'far fa-star'} />
            </span>
            <span onClick={() => handleRatingChange(3, slug)}>
                <i className={userRating >= 3 ? 'fas fa-star' : 'far fa-star'} />
            </span>
            <span onClick={() => handleRatingChange(4, slug)}>
                <i className={userRating >= 4 ? 'fas fa-star' : 'far fa-star'} />
            </span>
            <span onClick={() => handleRatingChange(5, slug)}>
                <i className={userRating === 5 ? 'fas fa-star' : 'far fa-star'} />
            </span><br />
            <span>{numReviews} reviews</span>
        </div>
    );
}

export default Rating;
