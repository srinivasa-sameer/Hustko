import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import db from "../Database";

function Profile() {
  const [username, setUsername] = useState("Hustko User0");
  const [password, setPassword] = useState("qwerty");
  const [email, setEmail] = useState("huskyko@gmail.com");
  const [mobile, setMobile] = useState("+10123456789");
  const [address1, setAddress1] = useState("1234 Main St");
  const [likedItems, setLikedItems] = useState(["Item1", "Item2", "Item3"]);
  const [isLiked, setLiked] = useState(true);

  const { userId } = useParams();
  const user = db.users.find((user) => user.id === userId);
  return (
    <div className="mx-2">
      <h1>Manage Profile</h1>
      <hr />
      <Link
        to={`/Hustko/Profile/userId/ProfileEditor`}
        className="btn btn-outline-primary float-end mx-4"
      >
        <BiSolidEditAlt className="me-2 mb-1" size={21} />
        Edit Profile
      </Link>
      <div>
        <ul className="list-group w-75 ms-4">
          <li className="list-group-item">
            <strong>Username: </strong>
            {user.username}
          </li>
          <li className="list-group-item">
            <strong>First Name: </strong>
            {user.firstName}
          </li>
          <li className="list-group-item">
            <strong>Last Name: </strong>
            {user.lastName}
          </li>
          <li className="list-group-item">
            <strong>Email: </strong>
            {user.email}
          </li>
          <li className="list-group-item">
            <strong>Mobile Number: </strong>
            {user.mobile}
          </li>
          <li className="list-group-item">
            <strong>Primary Address: </strong>
            {user.address1}
          </li>
          <li className="list-group-item">
            <strong>Liked Items: </strong>
            <div class="row row-cols-1 row-cols-md-2 g-4">
              {likedItems.map((item) => (
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
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Profile;
