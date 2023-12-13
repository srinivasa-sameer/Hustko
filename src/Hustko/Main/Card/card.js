import { useState } from 'react';
import './card.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import * as searchClient from '../../Search/client';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const [favorite, setFavorite] = useState(false);
  const icon = props.icon;
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };
  return (
      <Link
          to={props.linkTo}
          style={{ textDecoration: 'none' }}
      >
        <div className="card m-2">
          <img className="card-img-top" src={props.image} alt="product image" />
          <div className="card-body">
            {icon && (
              <div>
                {!favorite ? (
                  <FaRegHeart
                    className="float-end heartButton"
                    onClick={toggleFavorite}
                  />
                ) : (
                  <FaHeart
                    className="float-end heartButton"
                    onClick={toggleFavorite}
                  />
                )}
              </div>
            )}
            {/*<Link*/}
            {/*  to={`/Hustko/InternalDetails/${props.id}`}*/}
            {/*  style={{ textDecoration: 'none' }}*/}
            {/*>*/}
              <h5 className="card-title">{props.title}</h5>
            {/*</Link>*/}
            <p className="card-text">{props.description}</p>
            <p className="card-text">${props.price}</p>
          </div>
        </div>
      </Link>
  );
};

export default Card;
