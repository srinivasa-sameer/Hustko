import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { GetOneProduct } from "./client";
import RatingsAndReviews from "../RatingsAndReview";
import { GetAverageRatingBasedOnProductId } from "../RatingsAndReview/client";
import "../index.css";

const InternalProducts = () => {
  const [productTitle, setproductTitle] = useState([]);
  const [priceInfo, setPriceInfo] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStarsInfo] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: "",
    imageUrl: [],
    stars: "",
    price: 0,
    asin: "",
    description: "",
  });
  const { product_id } = useParams();

  const generateStars = () => {
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

  const productDetails = async () => {
    const averageRating = await GetAverageRatingBasedOnProductId(
      product_id
    ).then((data) => {
      setStarsInfo(data);
    });

    const response = await GetOneProduct(product_id).then((DBdata) => {
      setproductTitle(DBdata.name);
      setPriceInfo("$" + DBdata.price);
      setDescription();
      setImages([DBdata.image]);
      setData({
        ...data,
        name: DBdata.name,
        asin: product_id,
        stars: averageRating,
        imageUrl: DBdata.image,
        price: DBdata.price,
        description: DBdata.small_description,
      });
    });
  };

  useEffect(() => {
    productDetails();
  }, [product_id]);

  return (
    <div className="container prevent-covered-by-nav">
      <br></br>
      <div>
        <h1>{productTitle}</h1>
        <div
          className="my-3 mx-auto"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="container">
            <div className="row justify-content-center">
              {images.map((image) => (
                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img src={image} alt="product image" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="list-group mt-5">
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-4" style={{ textAlign: "left" }}>
                <span>
                  <b>Current Price</b>
                </span>
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
                style={{ textAlign: "left", verticalAlign: "middle" }}
              >
                <span>
                  <b>Rating</b>
                </span>
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
              <div className="col-md-4" style={{ textAlign: "left" }}>
                <span>
                  <b>Description</b>
                </span>
                :
              </div>
              <div className="col-md-8">
                <span>{description}</span>
              </div>
            </div>
          </li>
        </ul>
        <RatingsAndReviews productId={product_id}></RatingsAndReviews>
      </div>
    </div>
  );
};

export default InternalProducts;
