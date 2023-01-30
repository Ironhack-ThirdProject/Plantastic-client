/*
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
*/
import React, { createContext, useState } from "react";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);
  const value = { itemCount, setItemCount };

  console.log("This is the itemcount " + itemCount);
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
