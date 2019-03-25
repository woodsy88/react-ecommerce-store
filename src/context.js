import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {

    state = {
      products: [],
      detailProduct: detailProduct
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

    handleDetail = () => {
      console.log("hello from detail");  
    };

    addToCart = (id) => {
      console.log(`# ${id} product being added to card `);  
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