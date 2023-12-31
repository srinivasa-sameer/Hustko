import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IoStarSharp } from 'react-icons/io5';
import { IoIosStarHalf } from 'react-icons/io';
import RatingsAndReviews from '../RatingsAndReview';
import { GetAverageRatingBasedOnProductId } from '../RatingsAndReview/client';
import '../index.css';

const ExternalProducts = () => {
  const [productTitle, setproductTitle] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [priceInfo, setPriceInfo] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStarsInfo] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: '',
    imageUrl: [],
    stars: '',
    price: 0,
    asin: '',
    description: '',
  });
  const { product_id } = useParams();

  const generateStars = () => {
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

  const productDetails = async () => {
    const averageRating = await GetAverageRatingBasedOnProductId(
      product_id
    ).then((data) => {
      setStarsInfo(data);
    });
    const options = {
      method: 'GET',
      url: `https://amazon-data-scraper128.p.rapidapi.com/products/${product_id}`,
      params: {
        api_key: '7c2ad0119c6de3c43906dd81cc9d3084',
      },
      headers: {
        'X-RapidAPI-Key': '956a814490msh6c6d99ab43a07a0p10b50fjsnc36d110f48cd',
        'X-RapidAPI-Host': 'amazon-data-scraper128.p.rapidapi.com',
      },
    };

    //const options = null;

    axios
      .request(options)
      .then(function (response) {
        setproductTitle(response.data.name);
        setPriceInfo(response.data.pricing);
        setDescription(response.data.small_description);
        setImages(response.data.images);
        setData({
          ...data,
          name: response.data.name,
          asin: product_id,
          stars: averageRating,
          imageUrl: response.data.images[0],
          price: response.data.pricing,
          description: response.data.small_description,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    productDetails();
  }, [product_id, refresh]);

  return (
    <div className="container prevent-covered-by-nav">
      <br></br>
      <div>
        <h1>{productTitle}</h1>
        <div
          className="my-3 mx-auto"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <div className="container">
            <div className="row justify-content-center">
              {images.map((image) => (
                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={image}
                      alt="product image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="list-group mt-5">
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-4" style={{ textAlign: 'left' }}>
                <span>
                  <b>Current Price</b>
                </span>{' '}
                :
              </div>
              <div className="col-md-8">
                <span>{priceInfo}</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div
                className="col-md-4"
                style={{ textAlign: 'left', verticalAlign: 'middle' }}
              >
                <span>
                  <b>Rating</b>
                </span>{' '}
                :
              </div>
              <div className="col-md-8">
                <span>{stars}</span>
                <span>{generateStars()}</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-4" style={{ textAlign: 'left' }}>
                <span>
                  <b>Description</b>
                </span>{' '}
                :
              </div>
              <div className="col-md-8">
                <span>{description}</span>
              </div>
            </div>
          </li>
        </ul>
        <RatingsAndReviews
          setRefresh={setRefresh}
          refresh={refresh}
          productId={product_id}
        ></RatingsAndReviews>
      </div>
    </div>
  );
};

export default ExternalProducts;
