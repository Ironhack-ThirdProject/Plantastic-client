import axios from "axios";
import { useEffect, useState } from "react";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import { currencyFormatter } from "../../utils";

function ProfilePage() {
  const storedToken = localStorage.getItem("authToken");
  let userId = "";
  const [orders, setOrders] = useState();

  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      console.log("This is the axios res");
      console.log(response);
      userId = response.data._id;
    })
    .catch((err) => {
      console.log(err);
    });

  const getAllOrdersFromUser = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/order/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        console.log(orders);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllOrdersFromUser();
  }, []);

  return (
    <>
      {orders ? (
        <div>
          {orders.map((eachOrder) => (
            <OrderHistory eachOrder={eachOrder}></OrderHistory>
          ))}
        </div>
      ) : (
        <div>You have not ordered anything yet</div>
      )}
    </>
  );
}

export default ProfilePage;

