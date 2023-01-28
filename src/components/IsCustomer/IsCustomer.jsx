import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../Loading/Loading";

function IsCustomer({ children }) {
  const { isAdmin, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return children;
  }

}

export default IsCustomer;