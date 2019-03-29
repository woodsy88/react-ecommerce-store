import { storeProducts, detailProduct } from './data';
import React, { Component } from 'react';

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {

    state = {
      products: [],
      detailProduct: detailProduct,
      cart: []
    };

    componentDidMount(){
      this.setProducts();
    }

    setProducts = () => {

      let tempProducts = [];

      storeProducts.forEach(item => {
        const singleItem = {...item};
        tempProducts = [...tempProducts, singleItem];  
      })

      this.setState(() => {
        return {products: tempProducts}
      })
    }

    getItem = (id) => {
      const product = this.state.products.find(item => item.id === id );
      console.log('getItem product: ', product);
      return product;
    }

    handleDetail = (id) => {
      console.log("handleDetail ran");  
      const product = this.getItem(id);
      this.setState(() => {
        return {
          // set individual product to detailProduct in state
          detailProduct: product
        }
      })
    };

    addToCart = (id) => {

      let tempProducts = [...this.state.products];
      const index= tempProducts.indexOf(this.getItem(id));
      console.log(index);
      const product = tempProducts[index];
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;

      this.setState(() => {
        return {
            products: tempProducts,
            cart: [...this.state.cart, product]
          }
      },
      () => {console.log('cart: ', this.state);
      }
      );
    };

    render() {
      console.log('trying to check state:', this.state.products);
      return (
        <ProductContext.Provider value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
        }}>
        {/* <button onClick={this.tester}>test me</button> */}

          {this.props.children}
        </ProductContext.Provider>
      );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };