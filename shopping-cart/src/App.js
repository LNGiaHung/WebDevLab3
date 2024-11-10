import React from 'react';
import { CartProvider } from './CartContext';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css';

const App = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
  ];

  return (
    <CartProvider>
      <div className="app">
        <h1>Shopping Cart App</h1>
        <ProductList products={products} />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;