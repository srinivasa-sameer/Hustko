import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SearchProductsInDatabase } from './client';
import Card from '../Main/Card/card';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [databaseProducts, setDatabaseProducts] = useState([]);
  const { searchText } = useParams();
  var searchString = '';

  const searchProductsInDatabase = async () => {
    if (searchText !== undefined) {
      await SearchProductsInDatabase(searchText).then((data) => {
        setDatabaseProducts(data);
      });
    }
  };

  const searchProducts = () => {
    console.log(searchString);
    searchProductsInDatabase();
    if (searchText !== undefined) {
      searchString = searchText;
    }
    if (searchString !== '') {
      const options = {
        method: 'GET',
        url: `https://amazon-data-scraper128.p.rapidapi.com/search/${searchString}`,
        params: {
          api_key: '214fce8e1f0329d7b9d8bf1002dc9fd2',
        },
        headers: {
          'X-RapidAPI-Key':
            '3a316b5327mshd645ab47cc34fdap19bb56jsn5c6e5a76aa2f',
          'X-RapidAPI-Host': 'amazon-data-scraper128.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setProducts(response.data.results);
        })
        .catch(function (error) {});
    }
  };

  useEffect(() => {
    searchProducts();
  }, [searchText]);

  return (
    <div
      className="container d-flex flex-row flex-wrap"
      style={{ marginTop: '1 rem' }}
    >
      {products.map((product) => (
        <Link to={`/Hustko/ExternalDetails/${product.asin}`}>
          <div>
            <Card
              title={''}
              description={product.name}
              price={product.price}
              image={product.image}
            />
          </div>
        </Link>
      ))}
      {databaseProducts.map((product) => (
        <Link to={`/Hustko/InternalDetails/${product._id}`}>
          <div>
            <Card
              title={product.manufacturer}
              description={product.name}
              price={product.price}
              image={product.image}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Search;
