import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FcLike, FcDislike } from "react-icons/fc";
import db from "../../Database";
function ProfileEditor() {
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
    <div>
      <div className="container">
        <h1>Edit Profile</h1>
        <hr />
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-username" className="form-label me-2">
              Username:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-username"
              //value={user.username}
              placeholder="Please Enter Username"
              className="form-control mb-2 me-2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-email" className="form-label me-2">
              Email:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-email"
              //value={user.email}
              placeholder="user@gmail.com"
              className="form-control mb-2 me-2"
              type="email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-mobile" className="form-label me-2">
              Mobile Number:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-mobile"
              //value={user.mobile}
              placeholder="000-000-0000"
              className="form-control mb-2 me-2"
              type="tel"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-address" className="form-label me-2">
              Primary Address:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-address"
              //value={user.primAddress}
              placeholder="1234 Main St"
              className="form-control mb-2 me-2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="select-one-assignment-group">Assignment Group</label>
          </div>
          <div class="col-6 text-start mb-2">
            <select class="form-control" id="select-one-assignment-group">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>
      </div>
      {/* <div className="float-end">
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn btn-danger me-2"
        >
          Cancel
        </Link>
        <button
          onClick={isNewAssignment ? handleSave : handleUpdate}
          className="btn btn-success me-2"
        >
          Save
        </button>
      </div> */}
    </div>
  );
}
export default ProfileEditor;
