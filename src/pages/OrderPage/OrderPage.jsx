import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
<<<<<<< HEAD
import { Link, useParams } from "react-router-dom";
=======
import { Link } from "react-router-dom";
import IsCustomer from "../../components/IsCustomer/IsCustomer";
>>>>>>> 3cb8650fe3d5041ef5f0e5716379c58c58eb9b71
import { PlantOrderedCard } from "../../components/PlantOrderedCard/PlantOrderedCard";
import { currencyFormatter } from "../../utils";

function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [plants, setPlants] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
      .get(`${process.env.REACT_APP_SERVER_URL}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
<<<<<<< HEAD
=======
        console.log("LATEST ORDER!!!=====", response.data);
>>>>>>> 3cb8650fe3d5041ef5f0e5716379c58c58eb9b71
        setOrder(response.data);
        setPlants(response.data.products);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [plants]);

  return (
    <IsCustomer>
      <div>
        <h3>Your Order:</h3>
        {plants.length === 0 || order.status ? (
          <div>
            <h4>No products found.</h4>
          </div>
        ) : (
          <div>
            <Container>
              <Row>
                {plants.map((plant) => {
                  return (
                    <Col>
                      <PlantOrderedCard
                        props={plant}
                        getOrderDetails={getOrderDetails}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>

            <div>
              <h2>Total price: {currencyFormatter.format(totalPrice)}</h2>
            </div>

            <Link to={"/checkout"}>
              <Button variant="primary">Checkout</Button>
            </Link>
          </div>
        )}
      </div>
    </IsCustomer>
  );
}

export default OrderPage;
