import React, { useState, useEffect } from "react";

import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {IoStarSharp} from "react-icons/io5";
import {IoIosStarHalf} from "react-icons/io";
import { GetRatingsAndReviewBasedOnProductId} from "./client";
import Card from "../Main/Card/card";

const RatingsAndReviews = ({productId}) => {
    const [ratingsAndReviews, setRatingsAndReviews] = useState([

                                                               ]);

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
            await GetRatingsAndReviewBasedOnProductId(productId).then((data) => {
            setRatingsAndReviews(data);
        });
    };

    useEffect(() => {
        getRatingsAndReviews();
    }, [productId]);

    return (
        <div>
            <br></br>
            <div>
                <h5>Ratings And Review</h5>
                <div className="row">
                    <div className="col-md-4" style={{textAlign: "left"}}>
                              <span>
                                <b>Total Ratings & Reviews: {getTotalRatingsAndReview()}</b>
                              </span>{" "}
                    </div>
                    <div className="col-md-8">
                        <span>
                            <ul className="list-group">
                                    {ratingsAndReviews.map((ratingAndReview) => (
                                    <li className="list-group-item">
                                        <p style={{textAlign: "left"}}>{ratingAndReview.userId}</p>
                                        <p style={{textAlign: "left"}}>{generateStars(ratingAndReview.ratings)}</p>
                                        <p style={{textAlign: "left"}}>{ratingAndReview.review}</p>
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