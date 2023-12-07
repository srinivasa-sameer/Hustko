import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FcLike, FcDislike } from "react-icons/fc";
import * as client from "../UserClient";

function ProfileEditor() {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const reformattedDate = (rawDate) => {
    const unformattedDate = new Date(rawDate);
    const formattedDate = `${unformattedDate.getFullYear()}-${(
      unformattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${(unformattedDate.getDate() + 1)
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
    navigate("/Hustko/Profile");
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  // const [likedItems, setLikedItems] = useState(["Item1", "Item2", "Item3"]);
  // const [isLiked, setLiked] = useState(true);
  return (
    <div>
      <div className="container">
        <h1>Edit Profile</h1>
        <hr />
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-email" className="form-label me-2">
              Email:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-email"
              value={account.email}
              placeholder="user@gmail.com"
              className="form-control mb-2 me-2"
              type="email"
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-password" className="form-label me-2">
              Password:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-email"
              value={account.password}
              placeholder="Please Enter Password"
              className="form-control mb-2 me-2"
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-firstName" className="form-label me-2">
              First Name:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-firstName"
              value={account.firstName}
              placeholder="Please Enter First Name"
              className="form-control mb-2 me-2"
              onChange={(e) =>
                setAccount({ ...account, firstName: e.target.value })
              }
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-lastName" className="form-label me-2">
              Last Name:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-lastName"
              value={account.lastName}
              placeholder="Please Enter Last Name"
              className="form-control mb-2 me-2"
              onChange={(e) =>
                setAccount({ ...account, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-dob" className="form-label me-2">
              Date of Birth:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-dob"
              type="date"
              value={reformattedDate(account.dob)}
              placeholder="Please Enter Date of Birth"
              className="form-control mb-2 me-2"
              onChange={(e) => setAccount({ ...account, dob: e.target.value })}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-end pt-2">
            <label for="textbox-edit-role" className="form-label me-2">
              Role:
            </label>
          </div>
          <div class="col-6 text-start mb-2">
            <input
              id="textbox-edit-role"
              value={account.role}
              className="form-control mb-2 me-2"
              disabled
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
              value={account.mobile}
              placeholder="000-000-0000"
              className="form-control mb-2 me-2"
              type="tel"
              onChange={(e) =>
                setAccount({ ...account, mobile: e.target.value })
              }
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
              value={account.primAddress}
              placeholder="1234 Main St"
              className="form-control mb-2 me-2"
              onChange={(e) =>
                setAccount({ ...account, primAddress: e.target.value })
              }
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
        <hr />
        <div className="float-end">
          <Link to={"/Hustko/Profile"} className="btn btn-danger me-2">
            Cancel
          </Link>
          <button onClick={save} className="btn btn-success me-2">
            Save
          </button>
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
