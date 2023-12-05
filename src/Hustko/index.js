import { Route, Routes, Navigate } from "react-router";
import Nav from "../Nav";
import Main from "./Main";
import Profile from "./Profile";
import Search from "./Search";
function Hustko() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="Main" />} />
        <Route path="Main/*" element={<Main />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Search" element={<Search />} />
      </Routes>
    </div>
  );
}
export default Hustko;
