import React, { createContext, useState } from "react";

export const CartContext = createContext({
});

export const CartProvider = ({ children }) => {

  return (
    <div>{children}</div>
    // <CartContext.Provider value={{ cart, addProduct }}>
    //   {children}
    // </CartContext.Provider>
  );
};

export default CartProvider;
