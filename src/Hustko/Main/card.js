const Card = (props) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={props.image} alt="product image" />
      <div className="card-body">
        <h5 class="card-title">{props.title}</h5>
        <p class="card-text">{props.description}</p>
        <p class="card-text">${props.price}</p>
        <a href="#" class="btn btn-primary">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Card;
