import './card.css';
import { Link } from 'react-router-dom';
const Card = (props) => {
  return (
    <div className="card m-1">
      <img className="card-img-top" src={props.image} alt="product image" />
      <div className="card-body">
        <Link className="link" to="">
          <h5 class="card-title">{props.title}</h5>
        </Link>
        <p class="card-text">{props.description}</p>
        <p class="card-text">${props.price}</p>
      </div>
    </div>
  );
};

export default Card;
