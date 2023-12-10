import axios from 'axios';

const API_URL = process.env.REACT_APP_API_SARK || 'http://localhost:4000/api';

const GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL = `${API_URL}/ratingsAndReview`;

const ratingsAndReview = [{
    "_id": {
        "$oid": "65722dd509dc69717842835a"
    },
    "userId": "65700aa20da5548eba70cd44",
    "productId": "656fabcb815235e7f1cd63e8",
    "ratings": 4.4,
    "review": "The product is good"
},
    {
        "_id": {
            "$oid": "65722dd509dc69717842835b"
        },
        "userId": "65700aa20da5548eba70cd43",
        "productId": "656fabcb815235e7f1cd63e8",
        "ratings": 4.4,
        "review": "The product is good"
    },
    {
        "_id": {
            "$oid": "65722dd509dc69717842835c"
        },
        "userId": "65700aa20da5548eba70cd42",
        "productId": "656fabcb815235e7f1cd63e8",
        "ratings": 4.4,
        "review": "The product is good"
    },
    {
        "_id": {
            "$oid": "65722dd509dc69717842835d"
        },
        "userId": "65700aa20da5548eba70cd44",
        "productId": "656fabcb815235e7f1cd63e9",
        "ratings": 4.4,
        "review": "The product is good"
    },
    {
        "_id": {
            "$oid": "65722dd509dc69717842835e"
        },
        "userId": "65700aa20da5548eba70cd43",
        "productId": "656fabcb815235e7f1cd63e9",
        "ratings": 4.4,
        "review": "The product is good"
    },
    {
        "_id": {
            "$oid": "65722dd509dc69717842835f"
        },
        "userId": "65700aa20da5548eba70cd42",
        "productId": "656fabcb815235e7f1cd63e9",
        "ratings": 4.4,
        "review": "The product is good"
    }];

export const GetRatingsAndReviewBasedOnProductId = async (id) => {
    const data = await axios.get(`${GET_RATINGS_AND_REVIEW_BY_PRODUCT_ID_URL}/${id}`);
    return data.data.ratingsAndReviews;
};