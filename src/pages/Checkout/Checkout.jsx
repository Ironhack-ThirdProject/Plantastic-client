import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { currencyFormatter } from "../../utils";
import { EditOrder } from "../../components/EditOrder/EditOrder";
import IsCustomer from "../../components/IsCustomer/IsCustomer";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };

  const getCartDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/cart`, config)
      .then((res) => {
        console.log("this is the cart: ", res.data);
        setCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {cart.products.map((product, index) => {
          return (
            <Container>
              <Row>
                <h6>Name: {product.productId.name}</h6>
                <p>Price: {currencyFormatter.format(product.productId.price)}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Subtotal: {currencyFormatter.format(product.quantity * product.productId.price)}</p>
              </Row>
            </Container>
          );
        })}

        <div>
          <h4>Total price: {currencyFormatter.format(cart.totalPrice)}</h4>
        </div>

        <EditOrder cart={cart} getCartDetails={getCartDetails} />
      </div>
    </IsCustomer>
  );
}

export default Checkout;
