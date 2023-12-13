import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

const GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL = `${API_URL}/api/ratingsAndReview/product`;

const GET_RATINGS_AND_REVIEW_BY_USER_ID_URL = `${API_URL}/api/ratingsAndReview/user`;

export const GetRatingsAndReviewBasedOnProductId = async (id) => {
  const data = await request.get(
    `${GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL}/${id}`
  );
  return data.data.ratingsAndReviews;
};

export const GetAverageRatingBasedOnProductId = async (id) => {
  const data = await request.get(
      `${GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL}/averageRating/${id}`
  );
  console.log(data.data.averageRating.toFixed(1));
  return data.data.averageRating.toFixed(1);
};

export const GetRatingsAndReviewBasedOnUserId = async (user) => {
  const data = await request.get(
    `${GET_RATINGS_AND_REVIEW_BY_USER_ID_URL}/${user._id}`
  );
  return data.data.ratingsAndReviews;
};

export const UpdateRatingsAndReviewBasedOnProductId = async (
  ratingAndReview
) => {
  console.log(ratingAndReview);
  console.log(GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL);
  const data = await axios.post(
    `${GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL}`,
    ratingAndReview
  );
  return data.data.success;
};
