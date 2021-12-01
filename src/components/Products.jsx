import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/ProductService';

class Products extends React.Component {
  state = {
    products: [],
  };
  componentDidMount() {
    getProducts().then((response) => {
      console.log(response.data);
      const products = response.data;
      this.setState({ products });
    });
  }
  render() {
    return (
      <div>
        <div style={{ paddingTop: 10 }}>
          <Link to="/products/new" className="btn btn-primary">
            Add Product
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.product_name}</td>
                <td>{p.brand.brand_name}</td>
                <td>
                  <Link to={`/products/${p.id}`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Products;
