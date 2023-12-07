import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import * as client from "./UserClient";

function Profile() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const reformattedDate = (rawDate) => {
    const unformattedDate = new Date(rawDate);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = unformattedDate.toLocaleDateString("en-CA", options);
    console.log(formattedDate);
    return formattedDate;
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, [id]);
  // const [likedItems, setLikedItems] = useState(["Item1", "Item2", "Item3"]);
  // const [isLiked, setLiked] = useState(true);
  return (
    <div className="container">
      <h1>Manage Profile</h1>
      <hr />
      {account && (
        <div>
          {!id && (
            <Link
              to={`/Hustko/Profile/ProfileEditor`}
              className="btn btn-outline-primary m-4"
            >
              <BiSolidEditAlt className="me-2 mb-1" size={21} />
              Edit Profile
            </Link>
          )}
          <div>
            <ul className="list-group w-75 ms-4">
              {!id && (
                <li className="list-group-item">
                  <strong>Email: </strong>
                  {account.email}
                </li>
              )}
              <li className="list-group-item">
                <strong>First Name: </strong>
                {account.firstName}
              </li>
              <li className="list-group-item">
                <strong>Last Name: </strong>
                {account.lastName}
              </li>
              {!id && (
                <li className="list-group-item">
                  <strong>Date of Birth: </strong>
                  {reformattedDate(account.dob)}
                </li>
              )}
              <li className="list-group-item">
                <strong>Role: </strong>
                {account.role}
              </li>
              {!id && (
                <li className="list-group-item">
                  <strong>Mobile Number: </strong>
                  {account.mobile}
                </li>
              )}
              {!id && (
                <li className="list-group-item">
                  <strong>Primary Address: </strong>
                  {account.primAddress}
                </li>
              )}
              {/* <li className="list-group-item">
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
            </li> */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
