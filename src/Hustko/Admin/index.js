import React, { useState, useEffect } from 'react';
import * as client from './client';
import * as SupplierClient from '../Supplier/SupplierClient';
import {
  BsFillCheckCircleFill,
  BsPlusCircleFill,
  BsTrash3Fill,
  BsPencil,
} from 'react-icons/bs';

import Card from '../Main/Card/card';
import '../index.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({
    email: '',
    role: 'USER',
  });

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const fetchProducts = async () => {
    const products = await SupplierClient.findAllProducts();
    setProducts(products);
  };

  const deleteProduct = async (product) => {
    try {
      await SupplierClient.deleteProduct(product);
      setProducts({
        ...products,
        products: products?.products.filter((p) => p._id !== product._id),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container-fluid prevent-covered-by-nav">
      <h2>Admin Panel</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td className="d-flex">
              <input
                className="form-control"
                value={user.email}
                placeholder="Enter Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </td>
            <td>
              <input
                className="form-control"
                value={user.firstName}
                placeholder="Enter First Name"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                className="form-control"
                value={user.lastName}
                placeholder="Enter Last Name"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select
                className="form-select"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPPLIER">Supplier</option>
              </select>
            </td>
            <td className="text-nowrap">
              <BsFillCheckCircleFill
                onClick={updateUser}
                className="me-2 text-success fs-1 text"
              />
              <BsPlusCircleFill
                onClick={createUser}
                className="fs-1 text"
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td className="text-nowrap">
                <button className="btn btn-danger me-2">
                  <BsTrash3Fill onClick={() => deleteUser(user)} />
                </button>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectUser(user)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <h2>List of Products</h2>
      <div
        className="container d-flex flex-row flex-wrap"
        style={{ marginTop: '1 rem' }}
      >
        {products?.products?.map((product) => (
          <div key={product._id} style={{ marginBottom: '5rem' }}>
            <Card
              linkTo={`/Hustko/InternalDetails/${product._id}`}
              currentUserId=""
              title={product.manufacturer}
              description={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
              icon={false}
            />
            <button className="btn btn-danger me-2">
              <BsTrash3Fill onClick={() => deleteProduct(product)} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Admin;
