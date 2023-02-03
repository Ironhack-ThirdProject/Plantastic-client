import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const CartCountContext = React.createContext();

function CartCountProviderWrapper(props) {
  const savedState = localStorage.getItem("cart-context");
  const parsedState = parseInt(savedState);
  const [cartCount, setCartCount] = useState(parsedState);

  if (Number.isNaN(cartCount)) {
    setCartCount(0);
  }

  useEffect(() => {
    if (Number.isNaN(cartCount)) {
      setCartCount(0);
    }
    localStorage.setItem("cart-context", cartCount.toString());
  }, []);

  useEffect(() => {
    if (Number.isNaN(cartCount)) {
      setCartCount(0);
    }
    localStorage.setItem("cart-context", cartCount.toString());
  }, [cartCount]);

  return (
    <CartCountContext.Provider
      value={{
        cartCount,
        setCartCount,
      }}
    >
      {props.children}
    </CartCountContext.Provider>
  );
}

export { CartCountProviderWrapper, CartCountContext };
