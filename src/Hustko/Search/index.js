import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    searchProductsInDatabase();
    if (searchText !== undefined) {
      searchString = searchText;
    }
    if (searchString !== '') {
      // const options = {
      //   method: 'GET',
      //   url: `https://amazon-data-scraper128.p.rapidapi.com/search/${searchString}`,
      //   params: {
      //     api_key: '7c2ad0119c6de3c43906dd81cc9d3084'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '956a814490msh6c6d99ab43a07a0p10b50fjsnc36d110f48cd',
      //     'X-RapidAPI-Host': 'amazon-data-scraper128.p.rapidapi.com'
      //   }
      // };

      const options = null;

      axios
        .request(options)
        .then(function (response) {
          setProducts(response.data.results);
          console.log(response);
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
      {products?.map((product) => (
        <div>
          <Card
            linkTo={`/Hustko/ExternalDetails/${product.asin}`}
            title={''}
            description={product.name}
            price={product.price}
            image={product.image}
            id={product.asin}
            icon={true}
          />
        </div>
      ))}
      {databaseProducts?.map((product) => (
        <div>
          <Card
            linkTo={`/Hustko/InternalDetails/${product._id}`}
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
  );
};

export default Search;
