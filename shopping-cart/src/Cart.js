import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, removeAllFromCart, clearCart, getTotalPrice } = useCart();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove One</button>
              <button onClick={() => removeAllFromCart(item.id)}>Remove All</button>
            </div>
          ))}
          <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
          <button onClick={clearCart} style={{ backgroundColor: 'red', color: 'white' }}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;