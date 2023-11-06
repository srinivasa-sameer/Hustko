import { Route, Routes, Navigate } from "react-router";
import Nav from "../Nav";
import Main from "./Main";
import Profile from "./Profile";
function Hustko() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="Main" />} />
        <Route path="Main/*" element={<Main />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
export default Hustko;
