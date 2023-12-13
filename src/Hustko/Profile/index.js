import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BiSolidEditAlt } from 'react-icons/bi';
import * as client from './UserClient';
import * as productClient from '../Search/client';
import * as ratingsReviewClient from '../RatingsAndReview/client';
import Card from '../Main/Card/card';
import { IoStarSharp } from 'react-icons/io5';
import { IoIosStarHalf } from 'react-icons/io';

function Profile() {
  const { userId } = useParams();
  const [account, setAccount] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [
    ratingsAndReviewsWithProductNames,
    setRatingsAndReviewsWithProductNames,
  ] = useState([]);
  const navigate = useNavigate();
  const reformattedDate = (rawDate) => {
    const unformattedDate = new Date(rawDate);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = unformattedDate.toLocaleDateString('en-CA', options);
    return formattedDate;
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const findUserById = async (userId) => {
    const user = await client.findUserById(userId);
    setAccount(user);
  };
  const getFavoriteItems = async () => {
    if (account) {
      for (const favoriteItemId of account.favoriteItems) {
        const item = await getFavoriteItem(favoriteItemId);
        setFavoriteItems((favoriteItems) => [...favoriteItems, item]);
      }
    }
  };
  const getFavoriteItem = async (itemId) => {
    const item = await productClient.GetOneProduct(itemId);
    return item;
  };
  const getRatingsAndReviews = async () => {
    if (account) {
      const currentRatingAndReviews =
        await ratingsReviewClient.GetRatingsAndReviewBasedOnUserId(account);
      setRatingsAndReviews(currentRatingAndReviews);
    }
  };

  const fetchAndRenderReviews = async () => {
    getRatingsAndReviews();
    const updatedReviews = await Promise.all(
      ratingsAndReviews.map(async (ratingAndReview) => {
        try {
          const product = await productClient.GetOneProduct(
            ratingAndReview.productId
          );
          return { ...ratingAndReview, productName: product };
        } catch (error) {
          console.error('Error fetching product:', error);
          return { ...ratingAndReview, productName: 'Unknown Product' };
        }
      })
    );

    setRatingsAndReviewsWithProductNames(updatedReviews);
  };

  useEffect(() => {
    if (userId) {
      findUserById(userId);
    } else {
      fetchAccount();
    }
  }, [userId]);

  useEffect(() => {
    if (ratingsAndReviews.length > 0) {
      fetchAndRenderReviews();
    }
  }, [account]);

  const generateStars = (stars) => {
    let starIcons = [];
    let givenStars = 0;
    for (let i = 1; i <= stars; i++) {
      starIcons.push(<IoStarSharp style={{ color: 'gold' }} />);
      givenStars = givenStars + 1;
    }
    if (stars - givenStars !== 0) {
      starIcons.push(<IoIosStarHalf style={{ color: 'gold' }} />);
    }
    return <div>{starIcons}</div>;
  };

  const disableButton = () => {
    setButtonDisabled(true);
  };

  return (
    <div>
      <div className="container">
        <h1>Manage Profile</h1>
        <hr />
        {account && (
          <div>
            {!userId && (
              <Link
                to={`/Hustko/Profile/ProfileEditor`}
                className="btn btn-outline-primary m-4 float-end"
              >
                <BiSolidEditAlt className="me-2 mb-1" size={21} />
                Edit Profile
              </Link>
            )}
            <div className="d-flex justify-content-center">
              <ul className="list-group w-75 ms-4">
                {!userId && (
                  <li className="list-group-item">
                    <strong>Email: </strong>
                    {account.email}
                  </li>
                )}
                <li className="list-group-item">
                  <strong>First Name: </strong>
                  {account.firstName}
                </li>
                <li className="list-group-item">
                  <strong>Last Name: </strong>
                  {account.lastName}
                </li>
                {!userId && (
                  <li className="list-group-item">
                    <strong>Date of Birth: </strong>
                    {reformattedDate(account.dob)}
                  </li>
                )}
                <li className="list-group-item">
                  <strong>Role: </strong>
                  {account.role}
                </li>
                {!userId && (
                  <li className="list-group-item">
                    <strong>Mobile Number: </strong>
                    {account.mobile}
                  </li>
                )}
                {!userId && (
                  <li className="list-group-item">
                    <strong>Primary Address: </strong>
                    {account.primAddress}
                  </li>
                )}
                {/* {account && (
                  <li className="list-group-item">
                    <strong>Favorite Items: </strong>
                    {favoriteItems.map((product) => (
                      <div>
                        <Card
                          title={product.manufacturer}
                          description={product.name}
                          price={product.price}
                          image={product.image}
                        />
                      </div>
                    ))}
                  </li>
                )} */}
              </ul>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-warning my-4 mx-3"
                onClick={fetchAndRenderReviews}
              >
                Show Ratings and Reviews
              </button>
              <button
                className="btn btn-warning my-4 mx-3"
                onClick={() => {
                  getFavoriteItems();
                  disableButton();
                }}
                disabled={isButtonDisabled}
              >
                Get Liked Items
              </button>
            </div>
            <div className="m-4">
              <h4 className="d-flex justify-content-left">
                Ratings and Reviews:{' '}
              </h4>
              {ratingsAndReviewsWithProductNames && (
                <ul className="list-group">
                  {ratingsAndReviewsWithProductNames.map((ratingAndReview) => (
                    <li className="list-group-item" key={ratingAndReview._id}>
                      <Link
                        to={`/Hustko/InternalDetails/${ratingAndReview.productId}`}
                      >
                        <p style={{ textAlign: 'left' }}>
                          {ratingAndReview.productName.name}
                        </p>
                      </Link>
                      <p style={{ textAlign: 'left' }}>
                        {generateStars(ratingAndReview.ratings)}
                      </p>
                      <p style={{ textAlign: 'left' }}>
                        {ratingAndReview.review}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="m-4">
              <h4 className="d-flex justify-content-left">Favorite Items: </h4>
              <div className="d-flex flex-row flex-wrap">
                {favoriteItems.map((product) => (
                  <Card
                    title={product.manufacturer}
                    description={product.name}
                    price={product.price}
                    image={product.image}
                    icon={false}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
