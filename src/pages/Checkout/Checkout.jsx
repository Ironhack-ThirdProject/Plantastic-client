import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { currencyFormatter } from "../../utils";
import { EditOrder } from "../../components/EditOrder/EditOrder";
import IsCustomer from "../../components/IsCustomer/IsCustomer";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };


  function getCartDetails() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/cart`, config)
      .then((res) => {
        console.log("this is the cart: ", res.data)
        setCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  if (!cart || cart.products.length === 0) {
    return <h4>No products found.</h4>;
  }


  return (
    <IsCustomer>
    <div>
      <h1>This is checkout</h1>
      <Container>
        <Row>
          <p>Products go here</p>
        </Row>
      </Container>

      <div>
        <h2>Total price: {currencyFormatter.format(cart.totalPrice)}</h2>
      </div>

      <EditOrder cart={cart} getCartDetails={getCartDetails}/>
    </div>
    </IsCustomer>
  );
}

export default Checkout;
