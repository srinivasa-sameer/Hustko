import './App.css';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import Login from './Hustko/Login';
import Hustko from './Hustko';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Hustko" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Hustko/*" element={<Hustko />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
