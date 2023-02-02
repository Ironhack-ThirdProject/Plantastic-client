import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Button } from "react-bootstrap";
import logo from "../../logo.png";
import name from "../../image-name.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-color-bg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img className="logo" src={logo} alt="logo"></img>
        </Link>
        <Link
          className="nav-link active name-container"
          aria-current="page"
          to="#"
        >
          <img className="name" src={name} alt="name"></img>
        </Link>
        <Button
          className="navbar-toggler navbar-button"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/plants">
              All Plants
            </Link>
            {isLoggedIn && (
              <>
              {!isAdmin ? (
                <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              </>
              ) : (
                  <Link className="nav-item" to="/dashboard">Dashboard</Link>
              )}
              </>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <>
            <Link className="nav-link" to="/cart">
              <span className="badge badge-pill">1</span>
              <span>
                <i className="fas fa-shopping-cart icon-color"></i>
              </span>
            </Link>
            <Link className="nav-link">
              <Button className="navbar-button" onClick={logOutUser}>
                Logout
              </Button>
            </Link>
            {!isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart"></i>
                      <span>0</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
          </>
        )}
        {!isLoggedIn && (
          <div className="d-flex align-items-center">
            <Button className="navbar-button">
              <Link to="/login"> Login </Link>
            </Button>
            <Button className="navbar-button">
              <Link to="/signup"> Sign Up </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

{
  /*
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <img src="../../../public/logo.png" alt="logo"></img>
      </Link>
      <Button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </Button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/plants">Plants</Link>
              </li>
              {!isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart">
                      <AiFillShopping />
                      <i className="fas fa-shopping-cart"></i>
                      <span>0</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li className="nav-item">
                <h6>Welcome, {user && user.name}</h6>
              </li>
              <li className="nav-item">
                <Button onClick={logOutUser}>Logout</Button>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/signup"> Sign Up </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login"> Login </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
              */
}
