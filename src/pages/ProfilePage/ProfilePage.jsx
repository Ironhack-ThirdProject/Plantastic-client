import "./ProfilePage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../../utils";

function ProfilePage() {
  const storedToken = localStorage.getItem("authToken");
  let userId = "";
  const [orders, setOrders] = useState();

  const [showProductsInOrder, setShowProductsInOrder] = useState(false);

  const handleAllProductsInOrderClick = () => {
    setShowProductsInOrder(!showProductsInOrder);
  };

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
            <div key={eachOrder._id}>
              <p>{new Date(eachOrder.createdAt).toLocaleDateString()}</p>
              <p>
                Total Price: {currencyFormatter.format(eachOrder.totalPrice)}
              </p>
              <button onClick={handleAllProductsInOrderClick}>
                {showProductsInOrder ? "Hide" : "Show All Purchased Plants"}
              </button>
              {showProductsInOrder && (
                <div>
                  {eachOrder.products.map((oneProduct) => (
                    <div>
                    <p key={oneProduct.productId._id}>
                      Name: {oneProduct.productId.name} Price: {currencyFormatter.format(oneProduct.productId.price)} X {oneProduct.quantity}
                    </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>You have not ordered anything yet</div>
      )}
    </>
  );
}

export default ProfilePage;

