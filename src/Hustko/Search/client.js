import axios from 'axios';
const request = axios.create({
  withCredentials: true,
});

const API_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:4000';

const GET_PRODUCTS_FROM_DB_URL = `${API_URL}/api/search-products`;

const GET_ONE_PRODUCT_URL = `${API_URL}/api/products`;

export const SearchProductsInDatabase = async (pname) => {
  const data = await request.post(GET_PRODUCTS_FROM_DB_URL, {
    name: pname,
  });
  return data.data.products;
};

export const getAllProducts = async () => {
  const response = await request.get(GET_ONE_PRODUCT_URL);
  return response.data;
};

export const GetOneProduct = async (id) => {
  const data = await request.get(GET_ONE_PRODUCT_URL + `/${id}`);
  console.log(data.data.products);
  return data.data.products;
};

export const addLikedByUsers = async (item, user) => {
  const response = await request.put(
    `${GET_ONE_PRODUCT_URL}/likeduseradd/${item._id}/${user._id}`
  );
  return response.data;
};
export const removeLikedByUsers = async (item, user) => {
  const response = await request.put(
    `${GET_ONE_PRODUCT_URL}/likeduserremove/${item._id}/${user._id}`
  );
  return response.data;
};

export const getProductsBySupplierId = async (supplierId) => {
  const response = await request.get(
    `${GET_ONE_PRODUCT_URL}/supplier/${supplierId}`
  );
  return response.data;
};
