import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSuppliers } from '../services/SupplierService';

class Suppliers extends Component {
  state = {
    suppliers: [],
  };
  componentDidMount() {
    getSuppliers().then((response) => {
      console.log(response.data);
      const suppliers = response.data;
      this.setState({ suppliers });
    });
  }
  render() {
    return (
      <div>
        <div style={{ paddingTop: 10 }}>
          <Link to="/suppliers/new" className="btn btn-primary">
            Add Supplier
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Logo</th>
              {/* <th scope="col"></th>
              <th scope="col"></th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.suppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.supplier_name}</td>
                <td>{s.supplier_logo}</td>
                {/* <td>
                  <Link to={`/suppliers/${s.id}`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Suppliers;
