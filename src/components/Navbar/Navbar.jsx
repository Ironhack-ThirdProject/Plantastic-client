import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import {
  CartCountContext,
  CartCountProviderWrapper,
} from "../../context/cart.context";
import { AiFillShopping } from "react-icons/ai";

function Navbar(props) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartCountContext);

  return (
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
      <CartCountProviderWrapper props={cartCount}>
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
        </CartCountProviderWrapper>
      </nav>
  );
}

export default Navbar;
