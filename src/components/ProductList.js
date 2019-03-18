import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
  render() {
    return (
      <div>
        product list
        <Product />
      </div>
    );
  }
}

export default ProductList;