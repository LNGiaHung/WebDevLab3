import React from 'react';
import { useCart } from './CartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;