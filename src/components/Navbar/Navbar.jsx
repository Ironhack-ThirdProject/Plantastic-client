import "./Navbar.css";
import { useContext } from "react";
import React, { useState } from "react";
import { AuthContext } from "../../context/auth.context";
import {
  CartCountContext,
  CartCountProviderWrapper,
} from "../../context/cart.context";
import { Button } from "react-bootstrap";
import logo from "../../images/logo.png";
import name from "../../images/image-name.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, logOutUser, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartCountContext);
  const [showNavRight, setShowNavRight] = useState(false);

  return (
    <CartCountProviderWrapper props={cartCount}>
      <MDBNavbar expand="lg" className="custom-color-bg">
        <MDBContainer fluid>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavRight(!showNavRight)}
          >
            <MDBIcon icon="bars" fas className="icon-color" />
          </MDBNavbarToggler>
          <MDBNavbarNav left fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarBrand href="/">
              <img className="logo" src={logo} alt="logo"></img>
              <img className="name" src={name} alt="name"></img>
            </MDBNavbarBrand>
          </MDBNavbarNav>
          <MDBCollapse navbar show={showNavRight}>
            <MDBNavbarNav left fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink aria-current="page" href="/" className="link">
                  All Plants
                </MDBNavbarLink>
              </MDBNavbarItem>
              {isLoggedIn && !isAdmin && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      aria-current="page"
                      href="/profile"
                      className="link"
                    >
                      Profile
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
              {isLoggedIn && isAdmin && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard" className="link">
                      Dashboard
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
              {isLoggedIn && (
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <MDBBtn color="dark" className="navbar-button" onClick={logOutUser}>
                      Logout
                    </MDBBtn>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}
              {!isLoggedIn && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/signup" className="link">
                      Signup
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/login" className="link">
                      Login
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
          {isLoggedIn && !isAdmin && (
            <MDBNavbarLink href="/cart">
              <MDBBadge pill color="#D6FBD6">
                {cartCount}
              </MDBBadge>
              <MDBIcon
                size="lg"
                fas
                icon="shopping-cart"
                className="icon-color"
              ></MDBIcon>
            </MDBNavbarLink>
          )}
        </MDBContainer>
      </MDBNavbar>
    </CartCountProviderWrapper>
  );
}

export default Navbar;
