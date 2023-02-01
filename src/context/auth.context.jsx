import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // Send a request to the server using axios
      /* 
        axios.get(
          `${process.env.REACT_APP_SERVER_URL}/auth/verify`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {})
        
       authService
       .verifyAdmin()
       .then((response) => {
        console.log("This is the response from the backend");
        console.log("Is the User an admin? " + response.data.isAdmin);
        setIsAdmin(response.data.isAdmin);
       })
*/
      // Or using a service
      authService
        .verify()
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          setIsAdmin(response.data.isAdmin);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
          setIsAdmin(false);
        });
    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      setIsAdmin(false);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    // Run this code once the AuthProviderWrapper component in the App loads for the first time.
    // This effect runs when the application and the AuthProviderWrapper component load for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        isAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
