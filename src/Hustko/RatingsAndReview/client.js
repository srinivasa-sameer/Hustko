import axios from 'axios';

const API_URL = process.env.REACT_APP_API_SARK || 'http://localhost:4000/api';

const GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL = `${API_URL}/ratingsAndReview`;

export const GetRatingsAndReviewBasedOnProductId = async (id) => {
    const data = await axios.get(`${GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL}/${id}`);
    return data.data.ratingsAndReviews;
};