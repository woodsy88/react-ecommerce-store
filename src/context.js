import { storeProducts, detailProduct } from './data';
import React, { Component } from 'react';

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {

    state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubtotal: 0,
      cartTax: 0,
      cartTotal: 0,
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

    // Utility method - a method that is used in almost all other methods to get a specific product
    getItem = (id) => {
      const product = this.state.products.find(item => item.id === id );
      console.log('getItem product: ', product);
      return product;
    }
    // USING THIS STYLE OF ARROW FUNCTION NEGATES THE NEED TO BIND OUR FUNCTIONS IN A CONTRUCTOR
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

    openModal = id => {
      const product = this.getItem(id);
      this.setState(()=> {
        return {
          modalProduct: product,
          modalOpen: true
        }
      },
      () => {console.log('open modal ran');
      }
      )
    }

    closeModal = () => {
      this.setState(() => {
        return {
          modalOpen: false
        }
      })
    }

    increment = (id) => {
      console.log('this is increment method');
    }

    decrement = (id) => {
      console.log('this is decrement method');
    }

    removeItem = (id) => {
        console.log('item removed');      
    }

    clearCart = (id) => {
      console.log('items cleared from cart');
    }

    render() {
      console.log('trying to check state:', this.state.products);
      return (
        <ProductContext.Provider value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}>
        {/* <button onClick={this.tester}>test me</button> */}

          {this.props.children}
        </ProductContext.Provider>
      );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };