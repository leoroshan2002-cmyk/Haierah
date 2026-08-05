import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const getCartItemKey = (product) => {
    const productId = product?.id || product?._id || product?.productId || "product";
    const selectedColor = product?.selectedColor || product?.color || "";
    const selectedSize = product?.selectedSize || product?.size || "";
    return `${productId}::${selectedColor}::${selectedSize}`;
  };

  const addToCart = (product) => {
    const cartItemKey = getCartItemKey(product);

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => {
        const existingKey = item.cartItemKey || getCartItemKey(item);
        return existingKey === cartItemKey;
      });

      if (existingItemIndex >= 0) {
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                ...product,
                selectedSize: product.selectedSize || item.selectedSize,
                selectedColor: product.selectedColor || item.selectedColor,
                qty: item.qty + 1,
                cartItemKey,
              }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1, cartItemKey }];
    });

    toast.success("Item added to cart 🛒", {
      toastId: `cart-add-${product?.id || Date.now()}`,
      autoClose: 1500,
    });
  };

  const removeFromCart = (productIdOrKey) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        const itemKey = item.cartItemKey || getCartItemKey(item);
        return itemKey !== productIdOrKey && item.id !== productIdOrKey;
      })
    );
  };

  const updateQuantity = (productIdOrKey, qty) => {
    if (qty <= 0) {
      removeFromCart(productIdOrKey);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => {
          const itemKey = item.cartItemKey || getCartItemKey(item);
          return itemKey === productIdOrKey || item.id === productIdOrKey ? { ...item, qty } : item;
        })
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.qty, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, getCartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
