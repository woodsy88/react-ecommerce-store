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
        return {
          products: tempProducts
        }
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
      () => {
        this.addTotals();
        console.log('cart: ', this.state);
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

      // get list of all items in cart
      let tempCart = [...this.state.cart];
      // find item in cart we want to increment
      const selectedProduct = tempCart.find(item => item.id === id);
      // find the index of the product you want to increment
      const index = tempCart.indexOf(selectedProduct);
      // use index to find specific product
      const product = tempCart[index];

      // increment product count by 1 when + sign hit
      product.count = product.count + 1;
      //  calculate new total
      product.total = product.count * product.price;

      this.setState(() => {
        return {
          cart: [...tempCart]
        }
      }, () => {
        this.addTotals()
      })
    
    }

    decrement = (id) => {
      console.log(`this is decrement method for ${id}`);

      // get list of all items in cart
      let tempCart = [...this.state.cart];
      // find item in cart we want to deccement
      const selectedProduct = tempCart.find(item => item.id === id);
      // find the index of the product you want to decrement
      const index = tempCart.indexOf(selectedProduct);
      // use index to find specific product
      const product = tempCart[index];
      // reduce the count of that specific product by one
      product.count = product.count - 1;

      if(product.count === 0) {
        this.removeItem(id)
      } else {
        product.total = product.count * product.price;

        this.setState(() => {
          return {
            cart: [...tempCart]
          }
        }, this.addTotals()
        )}
    }

    removeItem = (id) => {
        console.log('item removed');  
        
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        // Remove from Cart
        // return only the items that do not match the id passed to the removeItem method
        tempCart = tempCart.filter(item => item.id !== id);


        const index = tempProducts.indexOf(this.getItem(id));
        
        // Remove from array
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        // set state to the array that contains all items besides the item.id passed to removeItem method
        this.setState(() => {
          return {
            cart: [...tempCart],
            products: [...tempProducts]
          }
        }, () => {
          this.addTotals();
        })
    }

    clearCart = (id) => {
      console.log('items cleared from cart');
      this.setState(() => {
        return { 
          cart: []
        }
      }, () => {
        this.setProducts()
      })
    }

    addTotals = () => {
      // subtotal
      let subTotal = 0;
      this.state.cart.map(item => (subTotal += item.total));
      console.log('subtotal', subTotal);
      
      // tax
      const tempTax = subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      // total
      const total = subTotal + tax;

      this.setState(() => {
        return {
          cartSubTotal: subTotal,
          cartTax: tax,
          cartTotal: total
        }
      })
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