import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/plants">
            <button>Plants</button>
          </Link>
          {!isAdmin ? (
            <>
              <Link to="/order">
                <button>My Order</button>
              </Link>
              <Link to="/profile">
                <button>Profile</button>
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
  );
}

export default Navbar;
