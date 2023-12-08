import React, { useState, useEffect } from "react";

import {IoStarSharp} from "react-icons/io5";
import {IoIosStarHalf} from "react-icons/io";
import { GetRatingsAndReviewBasedOnProductId} from "./client";
import {findUserById} from "../Profile/UserClient";
import {SearchProductsInDatabase} from "../Search/client";
import {Link} from "react-router-dom";

const RatingsAndReviews = ({productId}) => {
    const [ratingsAndReviews, setRatingsAndReviews] = useState([]);
    const [reviewsWithUserNames, setReviewsWithUserNames] = useState([]);

    const getTotalRatingsAndReview = () => {
        return ratingsAndReviews.length;
    }

    const generateStars = (stars) => {
        let starIcons = [];
        let givenStars = 0;
        for (let i = 1; i <= stars; i++) {
            starIcons.push(<IoStarSharp style={{color: "gold"}}/>);
            givenStars = givenStars + 1;
        }
        if((stars - givenStars) !== 0) {
            starIcons.push(<IoIosStarHalf style={{color: "gold"}}/>);
        }
        return <div>{starIcons}</div>;
    }

    const getRatingsAndReviews = async () => {
        try {
            await GetRatingsAndReviewBasedOnProductId(productId).then((data) => {
                setRatingsAndReviews(data);
            });

        } catch (error) {
            console.error('Error fetching ratings and reviews:', error);
        }
    };

    const fetchAndRenderReviews = async () => {
        const updatedReviews = await Promise.all(
            ratingsAndReviews.map(async (ratingAndReview) => {
                try {
                    const user = await findUserById(ratingAndReview.userId);
                    return { ...ratingAndReview, userName: user };
                } catch (error) {
                    console.error('Error fetching user:', error);
                    return { ...ratingAndReview, userName: 'Unknown User' };
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

    return (
        <div>
            <br />
            <div>
                <h5>Ratings And Reviews</h5>
                <div className="row">
                    <div className="col-md-4" style={{ textAlign: "left" }}>
            <span>
              <b>Total Ratings & Reviews: {getTotalRatingsAndReview()}</b>
            </span>{" "}
                    </div>
                    <div className="col-md-8">
            <span>
              <ul className="list-group">
                {reviewsWithUserNames.map((ratingAndReview) => (
                    <li className="list-group-item" key={ratingAndReview._id}>
                        <Link to={`/Hustko/Profile/${ratingAndReview.userId}`}><p style={{ textAlign: "left" }}>{ratingAndReview.userName.firstName}</p></Link>
                        <p style={{ textAlign: "left" }}>{generateStars(ratingAndReview.ratings)}</p>
                        <p style={{ textAlign: "left" }}>{ratingAndReview.review}</p>
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