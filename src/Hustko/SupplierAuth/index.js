import { Navigate } from 'react-router-dom';

const SupplierAuth = ({ children }) => {
  const role = localStorage.getItem('Role');

  if (role !== '' && role === 'SUPPLIER') {
    return children;
  } else {
    return <Navigate to="/Hustko/home" />;
  }
};
export default SupplierAuth;
