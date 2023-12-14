import axios from 'axios';
const request = axios.create({
  withCredentials: true,
});
export const BASE_API =
  process.env.REACT_APP_BASE_API_URL || 'http://localhost:4000';
export const PRODUCTS_API = `${BASE_API}/api/products`;

export const updateProduct = async (product) => {
  const response = await request.put(`${PRODUCTS_API}/${product._id}`, product);
  return response.data;
};
export const findAllProducts = async () => {
  const response = await request.get(`${PRODUCTS_API}`);
  return response.data;
};
export const createProduct = async (product) => {
  const response = await request.post(`${PRODUCTS_API}`, product);
  return response.data;
};
export const deleteProduct = async (product) => {
  const response = await request.delete(`${PRODUCTS_API}/${product._id}`);
  return response.data;
};

export const findProductsBySupplierId = async (supplierId) => {
  const response = await request.get(`${PRODUCTS_API}/supplier/${supplierId}`);
  return response.data;
};

export const findProductById = async (id) => {
  const data = await request.get(PRODUCTS_API + `/${id}`);
  console.log(data.data.products);
  return data.data.products;
};
