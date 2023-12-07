import './index.css';
import { Link } from 'react-router-dom';
const Card = (props) => {
  return (
    <div className="card" style={{ width: '15rem' }}>
      <img className="card-img-top" src={props.image} alt="product image" />
      <div className="card-body">
        <Link className="link" to="">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.description}</p>
          <p class="card-text">${props.price}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
