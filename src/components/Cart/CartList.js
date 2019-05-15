import React from 'react';
import CartItem from './CartItem';

const CartList = ({ value }) => {
  const { cart } = value
  console.log('CarList - value: ',value);
  console.log('CardList - cart: ',cart);
  
  return (
    <div className="container-fluid">
      {cart.map(item => {
        return <CartItem key={item.id} item={item} value={value} />
      })}
    </div>
  );
};

export default CartList;                        