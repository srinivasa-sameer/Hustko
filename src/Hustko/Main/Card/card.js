import { useState } from 'react';
import './card.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Card = (props) => {
  const [favorite, setFavorite] = useState(true);
  const addToFavorite = () => {
    setFavorite(!favorite);
  };
  return (
    <div className="card m-2">
      <img className="card-img-top" src={props.image} alt="product image" />
      <div className="card-body">
        {favorite ? (
          <FaRegHeart
            className="float-end heartButton"
            onClick={addToFavorite}
          />
        ) : (
          <FaHeart className="float-end heartButton" onClick={addToFavorite} />
        )}

        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text">${props.price}</p>
      </div>
    </div>
  );
};

export default Card;
