import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlantOrderedCard } from "../../components/PlantOrderedCard/PlantOrderedCard";
import { currencyFormatter } from "../../utils";
import { EditOrder } from "../../components/EditOrder/EditOrder";

function Checkout() {
  const [order, setOrder] = useState({});
  const [plants, setPlants] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const calculateTotalPrice = () => {
    let total = 0;
    plants.forEach((plant) => {
      total += plant.price;
    });
    setTotalPrice(total);
  };

  const getOrderDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/order`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setOrder(response.data);
        console.log("ordeerrrr", response.data)
        setPlants(response.data.products);
        setIsSubmitted(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderDetails();
  }, [isSubmitted]);

  
  useEffect(() => {
    calculateTotalPrice();
  }, [plants]);

  return (
    <div>
      <h1>This is checkout</h1>
      <Container>
        <Row>
          {plants.map((plant) => {
            return (
              <Col>
                <PlantOrderedCard
                  props={plant}
                  
                />
              </Col>
            );
          })}
        </Row>
      </Container>

      <div>
        <h2>Total price: {currencyFormatter.format(totalPrice)}</h2>
      </div>

      <EditOrder order={order} getOrderDetails={getOrderDetails} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
    </div>
  );
}

export default Checkout;
