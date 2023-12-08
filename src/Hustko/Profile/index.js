import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import * as client from "./UserClient";
import * as productClient from "../Search/client";
import Card from "../Main/Card/card";

function Profile() {
  const { userId } = useParams();
  const [account, setAccount] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();
  const reformattedDate = (rawDate) => {
    const unformattedDate = new Date(rawDate);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = unformattedDate.toLocaleDateString("en-CA", options);
    return formattedDate;
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const findUserById = async (userId) => {
    const user = await client.findUserById(userId);
    setAccount(user);
  };
  const getFavoriteItems = async () => {
    {
      account &&
        account.favoriteItems.forEach((favoriteItemId) => {
          getFavoriteItem(favoriteItemId).then((item) => {
            setFavoriteItems((favoriteItems) => [...favoriteItems, item]);
          });
        });
    }
  };
  const getFavoriteItem = async (itemId) => {
    const item = await productClient.GetOneProduct(itemId);
    return item;
  };
  useEffect(() => {
    if (userId) {
      findUserById(userId);
    } else {
      fetchAccount();
    }
    getFavoriteItems();
  }, [userId]);

  // const [isLiked, setLiked] = useState(true);
  return (
    <div>
      <div className="container">
        <h1>Manage Profile</h1>
        <hr />
        {account && (
          <div>
            {!userId && (
              <Link
                to={`/Hustko/Profile/ProfileEditor`}
                className="btn btn-outline-primary m-4 float-end"
              >
                <BiSolidEditAlt className="me-2 mb-1" size={21} />
                Edit Profile
              </Link>
            )}
            <div className="d-flex justify-content-center">
              <ul className="list-group w-75 ms-4">
                {!userId && (
                  <li className="list-group-item d-flex justify-content-left">
                    <strong>Email: </strong>
                    {account.email}
                  </li>
                )}
                <li className="list-group-item d-flex justify-content-left">
                  <strong>First Name: </strong>
                  {account.firstName}
                </li>
                <li className="list-group-item">
                  <strong>Last Name: </strong>
                  {account.lastName}
                </li>
                {!userId && (
                  <li className="list-group-item">
                    <strong>Date of Birth: </strong>
                    {reformattedDate(account.dob)}
                  </li>
                )}
                <li className="list-group-item">
                  <strong>Role: </strong>
                  {account.role}
                </li>
                {!userId && (
                  <li className="list-group-item">
                    <strong>Mobile Number: </strong>
                    {account.mobile}
                  </li>
                )}
                {!userId && (
                  <li className="list-group-item">
                    <strong>Primary Address: </strong>
                    {account.primAddress}
                  </li>
                )}
                {account && (
                  <li className="list-group-item">
                    <strong>Favorite Items: </strong>
                    {favoriteItems.map((product) => (
                      <div>
                        <Card
                          title={product.manufacturer}
                          description={product.name}
                          price={product.price}
                          image={product.image}
                        />
                      </div>
                    ))}
                  </li>
                )}
                {/* <li className="list-group-item">
              <strong>Liked Items: </strong>
              <div class="row row-cols-1 row-cols-md-2 g-4">
                {favoriteItems.map((item) => (
                  <div class="col">
                    <div class="card">
                      <img
                        src="/logo192.png"
                        class="card-img-top"
                        alt="..."
                      ></img>
                      <div class="card-body">
                        {isLiked && (
                          <FcLike
                            className="float-end"
                            size={30}
                            onClick={() => setLiked(!isLiked)}
                          />
                        )}
                        {!isLiked && (
                          <FcDislike
                            className="float-end"
                            size={30}
                            onClick={() => setLiked(!isLiked)}
                          />
                        )}
                        <h5 class="card-title">{item}</h5>
                        <p class="card-text">
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content. This content is a
                          little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </li> */}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
