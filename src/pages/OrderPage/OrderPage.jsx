import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlantDetails from "../../components/PlantDetails/PlantDetails";
import { PlantOrderedCard } from "../../components/PlantOrderedCard/PlantOrderedCard";
import { currencyFormatter } from "../../utils";

function OrderPage() {
  const [plants, setPlants] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const calculateTotalPrice = () => {
    let total = 0;
    plants.forEach(plant => {
      total += plant.price
    })
    setTotalPrice(total)
  }

  const getOrderDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/order`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPlants(response.data[0].products);
      })
      .catch((error) => console.log(error));
  };

  const handleOrder = (e) => {
    e.preventDefault()

    const requestBody = {
        firstName,
        lastName,
        shippingAddress,
        billingAddress
    }

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/order`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [plants]);


  return (
    <div>
      <h3>Your Order:</h3>
      <Container>
        <Row>
        {plants.map(plant => {
          return (
            <Col>
            <PlantOrderedCard props={plant} getOrderDetails={getOrderDetails}/>
            </Col>
          )
        })}
        </Row>
        </Container>

<h2>Total price: {currencyFormatter.format(totalPrice)}</h2>

      <form onSubmit={handleOrder}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Billing Address:</label>
        <input
          type="text"
          name="billingAddress"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />

        <label>Shipping Address:</label>
        <input
          type="text"
          name="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OrderPage;
