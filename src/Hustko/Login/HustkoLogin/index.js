import { Route, Routes, Navigate } from "react-router";
import Nav from "../Nav";
import Login from "./Login";
import Main from "./Main";
import Profile from "./Profile";
import ProfileEditor from "./Profile/ProfileEditor";
import RegistrationForm from "./Register/Register.js";
function Hustko() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="Main" />} />
        <Route path="Main/*" element={<Main />} />
        <Route path="Profile/:userId" element={<Profile />} />
        <Route path="Login/" element={<Login />} />
        <Route path="Registerpage" element={<RegistrationForm />} />
          <Route path="Profile/:userId/ProfileEditor"
          element={<ProfileEditor />} />
       
      </Routes>
    </div>
  );
}
export default Hustko;
