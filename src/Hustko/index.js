import { Route, Routes, Navigate } from 'react-router';
import Nav from './Navigation/Nav';
import Main from './Main';
import Profile from './Profile';
import Search from './Search';
import Admin from './Admin';
import Supplier from './Supplier';
import ProfileEditor from './Profile/ProfileEditor';
import ExternalProducts from './Search/externalProducts';
import InternalProducts from './Search/internalProducts';
import SignIn from './Login/HustkoLogin/SignIn';
import RegistrationForm from './Login/HustkoLogin/Register/Register';
import store from './store';
import { Provider } from 'react-redux';
import AdminAuth from './AdminAuth';
import SupplierAuth from './SupplierAuth';

function Hustko() {
  return (
    <Provider store={store}>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="home/*" element={<Main />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Search" element={<Main />} />
          <Route
            path="Admin"
            element={<AdminAuth children={<Admin />}></AdminAuth>}
          />
          <Route
            path="Supplier"
            element={<SupplierAuth children={<Supplier />}></SupplierAuth>}
          />
          <Route
            path="ExternalDetails/:product_id"
            element={<ExternalProducts />}
          />
          <Route
            path="InternalDetails/:product_id"
            element={<InternalProducts />}
          />
          <Route path="Search/:searchText" element={<Search />} />
          <Route path="Profile/:userId" element={<Profile />} />
          <Route path="Profile/ProfileEditor" element={<ProfileEditor />} />
        </Routes>
      </div>
    </Provider>
  );
}
export default Hustko;
