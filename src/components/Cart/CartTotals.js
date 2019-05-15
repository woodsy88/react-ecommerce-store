import React from 'react';
import { Link } from 'react-router-dom';
import PayPalButton from './PayPalButton';

const CartTotals = ({value, history}) => {

  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm ml-md-auto col-sm-8 text-right">
            <h5>
              <span className="text-title">
                Subtotal : <strong>${cartSubTotal}</strong>
              </span>
            </h5>
            <h5>
              <span className="text-title">
                Tax : <strong>${cartTax}</strong>
              </span>
            </h5>
            <h5>
              <span className="text-title">
                Total : <strong>${cartTotal}</strong>
              </span>
            </h5> 

            <Link to="/cart">
              <button className="btn btn-outline-danger text-uppercase mb-3 px-5" 
                      type="button"
                      onClick={() => clearCart()}
                      >
                Clear Cart
              </button>
            </Link> 
            <PayPalButton total={cartTotal} clearCart={clearCart} history={history} />                                  
          </div>
        </div>
    
      </div>
    </React.Fragment>
  );
};

export default CartTotals;