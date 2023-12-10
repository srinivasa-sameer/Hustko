import './card.css';
import { FaRegHeart } from 'react-icons/fa';

const addToFavorite = () => {
  console.log('Favorite!');
};

const Card = (props) => {
  return (
    <div className="card m-2">
      <img className="card-img-top" src={props.image} alt="product image" />
      <div className="card-body">
        <FaRegHeart className="float-end heartButton" onClick={addToFavorite} />
        <h5 class="card-title">{props.title}</h5>
        <p class="card-text">{props.description}</p>
        <p class="card-text">${props.price}</p>
      </div>
    </div>
  );
};

export default Card;
