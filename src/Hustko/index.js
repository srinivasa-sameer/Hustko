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
        <Route path="Profile/:userId" element={<Profile />} />
        <Route
          path="Profile/:userId/ProfileEditor"
          element={<ProfileEditor />}
        />
      </Routes>
    </div>
  );
}
export default Hustko;
