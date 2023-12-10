import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

const GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL = `${API_URL}/api/ratingsAndReview`;

export const GetRatingsAndReviewBasedOnProductId = async (id) => {
  const data = await request.get(
    `${GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL}/${id}`
  );
  return data.data.ratingsAndReviews;
};
