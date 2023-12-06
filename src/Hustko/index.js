import { Route, Routes, Navigate } from "react-router";
import Nav from "../Nav";
import Main from "./Main";
import Profile from "./Profile";
import Search from "./Search";
import ProfileEditor from "./Profile/ProfileEditor";
function Hustko() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="Main" />} />
        <Route path="Main/*" element={<Main />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Search" element={<Main />} />
        <Route
              path="Search/:searchText"
              element={<Search />}
        />
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
