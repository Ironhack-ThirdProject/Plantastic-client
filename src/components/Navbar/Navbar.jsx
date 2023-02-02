import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
<<<<<<< Updated upstream
import { AiFillShopping } from "react-icons/ai";
import { ShoppingCartContext } from "../../context/cart.context";
import { useState } from "react";
=======
import {
  CartCountContext,
  CartCountProviderWrapper,
} from "../../context/cart.context";
import { AiFillShopping } from "react-icons/ai";
import { useEffect, useState } from "react";
>>>>>>> Stashed changes

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartCountContext);

  return (
    <CartCountProviderWrapper props={cartCount}>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>

<<<<<<< Updated upstream
      {isLoggedIn && (
        <>
          <Link to="/plants">
            <button>Plants</button>
          </Link>
          {!isAdmin ? (
            <>
              <Link to="/profile">
                <button>Profile</button>
              </Link>
              <Link to="/cart">
                <div>
                  <AiFillShopping />
                  <span>({props.cartItemNumber})</span>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <button>Dashboard</button>
=======
        {isLoggedIn && (
          <>
            <Link to="/plants">
              <button>Plants</button>
>>>>>>> Stashed changes
            </Link>
            {!isAdmin ? (
              <>
                <Link to="/profile">
                  <button>Profile</button>
                </Link>
                <Link to="/cart">
                  <div>
                    <AiFillShopping />
                    <span className="cart-count">{cartCount}</span>
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <button>Dashboard</button>
              </Link>
            )}
            <button onClick={logOutUser}>Logout</button>

            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
          </>
        )}
      </nav>
    </CartCountProviderWrapper>
  );
}

export default Navbar;
