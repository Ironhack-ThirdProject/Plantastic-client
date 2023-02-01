import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Loading from "../Loading/Loading";

function IsCreator({ review, children }) {
  const { user, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (user._id === review.userId) {
    // If the user is not logged in navigate to the login page ❌
    return children;
  }

}

export default IsCreator;