import './index.css';
const Supplier = () => {
  return (
    <div className="container">
      <h1>Supplier Panel</h1>
      <hr />
      <div className="container">
        <form>
          <div className="row">
            <div className="col-2">
              <label>Product Name:</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-2">
              <label>Product Price:</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-2">
              <label>Product Image:</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-2">
              <label>Product Description:</label>
            </div>
            <div className="col-10">
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />

          <div className="float-end">
            <button class="btn btn-success addButton">Add Product</button>
            <button class="btn btn-warning">Update Product</button>
          </div>
        </form>

        <h2 className="listOfProducts">List of Products</h2>
        <hr />
      </div>
    </div>
  );
};

export default Supplier;
