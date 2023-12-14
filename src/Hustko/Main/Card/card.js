import { useEffect, useState } from "react";
import "./card.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as searchClient from "../../Search/client";
import { Link, useNavigate } from "react-router-dom";
import * as userclient from "../../Profile/UserClient";

const Card = (props) => {
  const [favorite, setFavorite] = useState(false);
  const icon = props.icon;

  const [account, setAccount] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  const findUserById = async () => {
    await userclient.findUserById(props.currentUserId).then((data) => {
      setAccount(data);
      setFavoriteItems(data.favoriteItems);
    });
  };

  const favoriteStatus = () => {
    if (account && favoriteItems.some((e) => e === props.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    if (props.currentUserId) {
      console.log("favorite boolean was " + favorite);
      setFavorite(!favorite);
      console.log("favorite boolean was " + favorite);
      if (favorite) {
        console.log("removing item to favorite items");
        const newFavoriteItems = favoriteItems.filter((e) => e !== props.id);
        setFavoriteItems(newFavoriteItems);
      } else {
        console.log("adding item to favorite items");
        setFavoriteItems([props.id, ...favoriteItems]);
      }
      setFavorite(!favorite);
      console.log("favorite boolean is changed to " + favorite);
      setAccount({ ...account, favoriteItems: favoriteItems });

      console.log("new account is" + account);
      await userclient.updateUser(account);
    } else {
      navigate("/Hustko/Login");
    }
  };

  useEffect(() => {
    console.log("this is currentUserId" + props.currentUserId);
    if (props.currentUserId) {
      findUserById();
    }
  }, [props.currentUserId]);

  useEffect(() => {
    if (favoriteItems.length > 0) {
      favoriteStatus();
    }
  }, [account]);
  return (
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
        <h5 className="card-title">{props.title}</h5>
        <Link to={props.linkTo} style={{ textDecoration: "none" }}>
          <p className="card-text">{props.description}</p>
          <p className="card-text">${props.price}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
