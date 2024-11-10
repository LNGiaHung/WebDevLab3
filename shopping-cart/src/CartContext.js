import React, { createContext, useContext, useState } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // If the product already exists, increase the quantity
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // If the product does not exist, add it with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === productId);
            if (existingProduct && existingProduct.quantity > 1) {
                // If the product exists and quantity is more than 1, decrease the quantity
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                // If the quantity is 1 or the product does not exist, remove it from the cart
                return prevCart.filter(item => item.id !== productId);
            }
        });
    };

    // New function to remove all instances of a product
    const removeAllFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeAllFromCart, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};