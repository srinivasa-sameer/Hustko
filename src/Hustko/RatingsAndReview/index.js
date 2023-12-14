import React, { useState, useEffect } from "react";

import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import {
  GetRatingsAndReviewBasedOnProductId,
  UpdateRatingsAndReviewBasedOnProductId,
} from "./client";
import { Link, useNavigate } from "react-router-dom";
import * as userclient from "../Profile/UserClient";

const RatingsAndReviews = ({ productId, setRefresh, refresh }) => {
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]);
  const [reviewsWithUserNames, setReviewsWithUserNames] = useState([]);
  const [ratingAndReviewData, setRatingAndReviewData] = useState({
    productId: productId,
    userId: "",
    ratings: 0,
    review: "",
  });
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const setCurrentUser = async () => {
    try {
      const userId = await userclient.account();
      setAccount(userId);
      setRatingAndReviewData({ ...ratingAndReviewData, userId: userId._id });
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const addRatingAndReview = async () => {
    if (account !== "") {
      await UpdateRatingsAndReviewBasedOnProductId(ratingAndReviewData);
      setRatingsAndReviews([...ratingsAndReviews, ratingAndReviewData]);
      setRefresh(!refresh);
    } else {
      navigate("/Hustko/Login");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRatingAndReviewData({ ...ratingAndReviewData, [name]: value });
  };

  const getTotalRatingsAndReview = () => {
    return ratingsAndReviews.length;
  };

  const generateStars = (stars) => {
    let starIcons = [];
    let givenStars = 0;
    for (let i = 1; i <= stars; i++) {
      starIcons.push(<IoStarSharp style={{ color: "gold" }} />);
      givenStars = givenStars + 1;
    }
    if (stars - givenStars !== 0) {
      starIcons.push(<IoIosStarHalf style={{ color: "gold" }} />);
    }
    return <div>{starIcons}</div>;
  };

  const getRatingsAndReviews = async () => {
    try {
      await GetRatingsAndReviewBasedOnProductId(productId).then((data) => {
        setRatingsAndReviews(data);
      });
    } catch (error) {
      console.error("Error fetching ratings and reviews:", error);
    }
  };

  const fetchAndRenderReviews = async () => {
    const updatedReviews = await Promise.all(
      ratingsAndReviews.map(async (ratingAndReview) => {
        try {
          const user = await userclient.findUserById(ratingAndReview.userId);
          return { ...ratingAndReview, userName: user };
        } catch (error) {
          console.error("Error fetching user:", error);
          return { ...ratingAndReview, userName: "Unknown User" };
        }
      })
    );
    setReviewsWithUserNames(updatedReviews);
  };

  useEffect(() => {
    getRatingsAndReviews();
  }, [productId]);

  useEffect(() => {
    if (ratingsAndReviews.length > 0) {
      fetchAndRenderReviews();
    }
  }, [ratingsAndReviews]);

  useEffect(() => {
    setCurrentUser();
  }, []);

  return (
    <div>
      <br />
      <div>
        <h5>Ratings And Reviews</h5>
        <div className="row">
          <div className="col-md-4" style={{ textAlign: "left" }}>
            <span>
              <b>Total Ratings & Reviews: {getTotalRatingsAndReview()}</b>
            </span>
          </div>
          <div className="col-md-8">
            <span>
              <div className="container justify-content-end">
                <input
                  className="form-control m-2"
                  type="number"
                  name="ratings"
                  placeholder="ratings"
                  value={ratingAndReviewData.ratings}
                  onChange={handleChange}
                />
                <input
                  className="form-control m-2"
                  type="text"
                  name="review"
                  placeholder="review"
                  value={ratingAndReviewData.review}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  onClick={addRatingAndReview}
                >
                  Add Rating And Review
                </button>
              </div>
              <ul className="list-group m-2">
                {reviewsWithUserNames.map((ratingAndReview) => (
                  <li className="list-group-item" key={ratingAndReview._id}>
                    <Link to={`/Hustko/Profile/${ratingAndReview.userId}`}>
                      <p style={{ textAlign: "left" }}>
                        {ratingAndReview.userName.firstName}
                      </p>
                    </Link>
                    <p style={{ textAlign: "left" }}>
                      {generateStars(ratingAndReview.ratings)}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      {ratingAndReview.review}
                    </p>
                  </li>
                ))}
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsAndReviews;
