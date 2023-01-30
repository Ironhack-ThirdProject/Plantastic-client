import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../Loading/Loading";

function IsAdmin({ children }) {
  const { isAdmin, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (isAdmin) {
    // If the user is not logged in navigate to the login page ❌
    return children;
  }

}

export default IsAdmin;