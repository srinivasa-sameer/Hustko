import { useEffect, useState } from 'react';
import './index.css';
import '../index.css';
import * as client from './SupplierClient';
import * as userClient from '../Profile/UserClient';
import Card from '../Main/Card/card';
import { BsTrash3Fill, BsPencil } from 'react-icons/bs';

const Supplier = () => {
  const [products, setProducts] = useState([]);
  const [account, setAccount] = useState(null);
  const [product, setProduct] = useState({
    manufacturer: '',
    name: '',
    price: '',
    image: '',
    small_description: '',
    quantity: '',
    supplierId: account?._id,
  });
  const accountId = account?._id;

  const getProductsBySupplierId = async () => {
    if (account) {
      const products = await client.findProductsBySupplierId(account._id);
      console.log(account._id);

      setProducts(products);
    }
  };

  const fetchAccount = async () => {
    const account = await userClient.account();
    setAccount(account);
  };

  const createProduct = async () => {
    try {
      const newProduct = await client.createProduct({
        ...product,
        supplierId: accountId,
      });

      setProduct({ supplierId: accountId, ...product });
      setProducts([newProduct, ...products]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectProduct = async (prod) => {
    try {
      const p = await client.findProductById(prod._id);
      setProduct(p);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
      const status = await client.updateProduct(product);
      setProducts(products.map((p) => (p._id === product._id ? product : p)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (product) => {
    try {
      await client.deleteProduct(product);
      setProducts(products.filter((p) => p._id !== product._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAccount();
    getProductsBySupplierId();
  }, [account?._id, product]);
  return (
    <div className="container prevent-covered-by-nav">
      <h1>Supplier Panel</h1>
      <hr />
      <div className="container">
        <form>
          <div className="row">
            <div className="col-2">
              <label>Product Manufacturer:</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                value={product.manufacturer}
                onChange={(e) =>
                  setProduct({ ...product, manufacturer: e.target.value })
                }
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-2">
              <label>Product Name:</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-2">
              <label>Product Price:</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-2">
              <label>Product Image:</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-2">
              <label>Product Description:</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                value={product.small_description}
                onChange={(e) =>
                  setProduct({ ...product, small_description: e.target.value })
                }
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-2">
              <label>Product Quantity:</label>
            </div>
            <div className="col-10">
              <input
                type="number"
                className="form-control"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
              />
            </div>
          </div>
          <br />

          <div className="float-end">
            <button class="btn btn-success addButton" onClick={createProduct}>
              Add Product
            </button>
            <button class="btn btn-warning" onClick={updateProduct}>
              Update Product
            </button>
          </div>
        </form>

        <h2 className="listOfProducts">List of Products</h2>
        <hr />
        <div
          className="container d-flex flex-row flex-wrap"
          style={{ marginTop: '1 rem' }}
        >
          {products?.map((product) => (
            <div key={product._id} style={{ marginBottom: '5rem' }}>
              <Card
                linkTo={`/Hustko/InternalDetails/${product._id}`}
                title={product.manufacturer}
                description={product.name}
                price={product.price}
                image={product.image}
                id={product._id}
                icon={false}
              />
              <div>
                <button className="btn btn-danger me-2">
                  <BsTrash3Fill onClick={() => deleteProduct(product)} />
                </button>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectProduct(product)} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supplier;
