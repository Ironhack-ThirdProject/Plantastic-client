import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import ReviewHistory from "../../components/ReviewHistory/ReviewHistory";

function ProfilePage() {
  const [orders, setOrders] = useState();
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const getReviews = () => {
    if (user) {
      //fetch reviews
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/reviews/user/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  const getOrders = () => {
    if (user) {
      //fetch orders
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/order/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getReviews();
  }, [user]);

  useEffect(() => {
    getOrders();
  }, [user]);

  return (
    <>
      {orders ? (
        <div>
          {orders.map((orderData) => (
            <OrderHistory eachOrder={orderData}></OrderHistory>
          ))}
        </div>
      ) : (
        <div>You have not ordered anything yet</div>
      )}
      {!reviews ? (
        <div>
          {reviews.map((reviewData) => (
            <ReviewHistory
              eachReview={reviewData}
              callbackToGetReviews={getReviews}
            ></ReviewHistory>
          ))}
        </div>
      ) : (
        <div>You have not reviewed anything yet</div>
      )}
    </>
  );
}

export default ProfilePage;
