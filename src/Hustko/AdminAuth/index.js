import { Navigate } from 'react-router-dom';
const AdminAuth = ({ children }) => {
  const role = localStorage.getItem('Role');

  if (role !== '' && role === 'ADMIN') {
    return children;
  } else {
    return <Navigate to="/Hustko/home" />;
  }
};
export default AdminAuth;
