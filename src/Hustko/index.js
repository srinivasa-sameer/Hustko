import { Route, Routes, Navigate } from "react-router";
import Nav from "./Navigation/Nav";
import Main from "./Main";
import Profile from "./Profile";
import ProfileEditor from "./Profile/ProfileEditor";
function Hustko() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="Main" />} />
        <Route path="Main/*" element={<Main />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Profile/:id" element={<Profile />} />
        <Route path="Profile/ProfileEditor" element={<ProfileEditor />} />
      </Routes>
    </div>
  );
}
export default Hustko;
