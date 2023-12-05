import React from "react";
import {PiCurrencyDollarSimpleBold} from "react-icons/pi";

const products = [
    {
        to: "#",
        imgSrc:
            "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=600",
        alt: "img1",
        brand: "Adidas",
        description: "Adidas Shoes",
        price: "300"
    },
    {
        to: "#",
        imgSrc:
            "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=600",
        alt: "img2",
        brand: "Nike",
        description: "Nike Shoes",
        price: "300"
    },
    {
        to: "#",
        imgSrc:
            "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "img3",
        brand: "Puma",
        description: "Reebok Shoes",
        price: "300"
    },
    {
        to: "#",
        imgSrc:
            "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "img4",
        brand: "Reebok",
        description: "Puma Shoes",
        price: "300"
    },
];

export default function Search() {
    return (

        <div className="d-flex flex-row flex-wrap">
            {products.map((product) => (
                <a href={product.to} style={{textDecoration: "none"}}>
                <div className="card m-3" style={{width: 250, height: 250}}>
                    <img src={product.imgSrc} alt={product.alt} className="card-img-top" style={{width: 250, height: 150}}/>
                    <div className="card-body">
                        <div className="text-secondary">
                                <p className="card-text">
                                    {product.description}<br/>
                                    {product.brand}</p>
                        </div>
                        <div>
                            <PiCurrencyDollarSimpleBold></PiCurrencyDollarSimpleBold> {product.price}
                        </div>
                    </div>
                </div>
                </a>
            ))}
        </div>
    );
}
