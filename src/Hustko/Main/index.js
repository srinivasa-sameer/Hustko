import React, { useEffect, useState } from 'react';
import Card from './Card/card';
import * as SupplierClient from '../Supplier/SupplierClient';

function Main() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const products = await SupplierClient.findAllProducts();
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div
        className="container d-flex flex-row flex-wrap"
        style={{ marginTop: '1 rem' }}
      >
        {products?.products?.map((product) => (
          <div key={product._id}>
            <Card
              title={product.manufacturer}
              description={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
              icon={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Main;
