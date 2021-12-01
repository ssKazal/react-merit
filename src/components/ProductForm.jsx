import React, { Component } from 'react';
import { getBrands } from '../services/BrandService';
import { saveProduct, getProduct } from '../services/ProductService';
import { saveSupplier, getSuppliers } from '../services/SupplierService';

class ProductForm extends Component {
  state = {
    products: { id: '', productName: '', brand: '' },
    brandList: [],
    suppliers: { id: '', supplierName: '', supplierLogo: '' },
    supplierList: [],
    productSuppliers: { id: '', supplier: '', product: '', price: '', minimumOrderQuantity: '', estimatedDeliveryTime: '' },
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    if (productId !== 'new') {
      getProduct(productId).then((response) => {
        const products = { id: productId, productName: response.data.product_name, brand: response.data.brand.id };
        this.setState({ products });
      });
      // getSupplier(productId).then((response) => {
      //   const suppliers = { id: productId, supplierName: response.data.supplier_name, supplierLogo: response.data.supplier_logo };
      //   this.setState({ suppliers });
      // });
    }
    getBrands().then((response) => {
      const brandList = response.data;
      this.setState({ brandList });
    });
    getSuppliers().then((response) => {
      const supplierList = response.data;
      this.setState({ supplierList });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { products } = this.state;
    const obj = { id: products.id, brand: products.brand, product_name: products.productName };
    saveProduct(obj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (e) {
        if (e.response && e.response.status === 400) {
          console.log('ALl field must be set!');
        }
      });
  };

  handleProductNameChange = (e) => {
    const products = { ...this.state.products };
    products.productName = e.target.value;
    this.setState({ products });
  };

  handleBrandChange = (e) => {
    const products = { ...this.state.products };
    products.brand = e.target.value;
    this.setState({ products });
  };

  handleSupplierNameChange = (e) => {
    const suppliers = { ...this.state.suppliers };
    suppliers.supplierName = e.target.value;
    this.setState({ suppliers });
  };

  handleSupplierLogoChange = (e) => {
    const suppliers = { ...this.state.suppliers };
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      suppliers.supplierLogo = e.target.result;
    };
    this.setState({ suppliers });
  };

  handleSaveSupplier = (e) => {
    e.preventDefault();
    const { suppliers } = this.state;
    const obj = { id: suppliers.id, supplier_name: suppliers.supplierName, supplier_logo: suppliers.supplierLogo };
    saveSupplier(obj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (e) {
        if (e.response && e.response.status === 400) {
          console.log('ALl field must be set!');
        }
      });
    console.log('Clicked!');
  };

  handleProductSupplierChange = (e) => {
    const productSuppliers = { ...this.state.productSuppliers };
    productSuppliers.supplier = e.target.value;
    this.setState({ productSuppliers });
  };

  handlePriceChange = (e) => {
    //
  };

  handleMinimumOrderQuantityChange = (e) => {
    //
  };

  handleEstimatedDeliveryTimeChange = (e) => {
    //
  };

  render() {
    const { products, brandList, suppliers, supplierList, productSuppliers } = this.state;
    return (
      <div>
        <div className="product-form">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input type="text" className="form-control" id="productName" value={products.productName} onChange={this.handleProductNameChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">
                Brand
              </label>
              <select className="form-select" id="brand" value={products.brand} onChange={this.handleBrandChange}>
                <option value="" />
                {brandList.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brand_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Supplier */}
            <div className="supplier-form">
              <div className="mb-3">
                <label htmlFor="supplierName" className="form-label">
                  Supllier Name
                </label>
                <input type="text" className="form-control" id="supplierName" value={suppliers.supplierName} onChange={this.handleSupplierNameChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="supplierLogo" className="form-label">
                  Supllier Logo
                </label>
                <input type="file" className="form-control" id="supplierLogo" onChange={this.handleSupplierLogoChange} />
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={this.handleSaveSupplier}>
                  Add Supplier
                </button>
              </div>
            </div>
            {/* End supplier  */}

            {/* Product Supplier */}
            <div className="product-supplier-form">
              <div className="mb-3">
                <label htmlFor="supplier" className="form-label">
                  Supplier
                </label>
                <select className="form-select" id="supplier" value={productSuppliers.supplier} onChange={this.handleProductSupplierChange}>
                  <option value="" />
                  {supplierList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.supplier_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input type="number" className="form-control" id="price" value={productSuppliers.price} onChange={this.handlePriceChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="minimumOrderQuantity" className="form-label">
                  Minimum Order Quantity
                </label>
                <input type="number" className="form-control" id="minimumOrderQuantity" value={productSuppliers.minimumOrderQuantity} onChange={this.handleMinimumOrderQuantityChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="estimatedDeliveryTime" className="form-label">
                  Estimated Delivery Time
                </label>
                <input type="number" className="form-control" id="estimatedDeliveryTime" value={productSuppliers.estimatedDeliveryTime} onChange={this.handleEstimatedDeliveryTimeChange} />
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={this.handleSaveProductSupplier}>
                  Save Product Supplier
                </button>
              </div>
            </div>
            {/* End product Supplier */}

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
