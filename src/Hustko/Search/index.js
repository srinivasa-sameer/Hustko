import React, { useEffect, useState, useRef } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {SearchProductsInDatabase} from "./client";
import Card from "../Main/card";

const Search = () => {
    const [products, setProducts] = useState([]);
    const [databaseProducts, setDatabaseProducts] = useState([]);
    const { searchText } = useParams();
    var searchString = "";

    const searchProductsInDatabase = async () => {
        if (searchText !== undefined) {
            await SearchProductsInDatabase(searchText).then((data) => {
                console.log(data);
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
        if (searchString !== "") {
            const options = {
                method: "GET",
                url: "https://amazon24.p.rapidapi.com/api/product",
                params: {
                    categoryID: "aps",
                    keyword: { searchString },
                    country: "US",
                    page: "1",
                },
                headers: {
                    "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
                    "X-RapidAPI-Key":
                        "7c3530cf95msh4a42849e06f7945p146398jsne990820a2f14",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    setProducts(response.data.docs);
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
                <div>
                    <Card
                        title={""}
                        description={product.product_title}
                        price={product.app_sale_price}
                        image={product.product_main_image_url}
                    />
                </div>
            ))}
            {databaseProducts.map((product) => (
                <div>
                    <Card
                        title={product.manufacturer}
                        description={product.name}
                        price={product.price}
                        image={product.image}
                    />
                </div>
            ))}
        </div>
    );
};

export default Search;