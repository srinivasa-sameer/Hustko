import axios from "axios";

const API_URL = process.env.REACT_APP_API_SARK || "http://localhost:4000/api";

const GET_PRODUCTS_FROM_DB_URL = `${API_URL}/search-products`;

export const SearchProductsInDatabase = async (pname) => {
    const data = await axios.post(GET_PRODUCTS_FROM_DB_URL, {
        name: pname,
    });
    return data.data.products;
};
