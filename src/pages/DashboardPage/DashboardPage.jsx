import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { currencyFormatter } from "../../utils";

function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [orderTotals, setOrderTotals] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const storedToken = localStorage.getItem("authToken");

  const getRevenue = () => {
    let total = 0;
    orders.forEach(order => {
        order.products.forEach(product => {
            total += product.price;
        });
    });
    setRevenue(total);
  }

  const getOrderTotals = () => {
    const totals = {};
    orders.forEach((order) => {
      let total = 0;
      order.products.forEach((product) => {
        total += product.price;
      });
      totals[order._id] = total;
    });
    setOrderTotals(totals);
  }

  const getAllOrders = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    getRevenue()
  }, [orders]);

  useEffect(() => {
    getOrderTotals()
  }, [orders]);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <h2>Current orders: {orders.length}</h2>
      {orders.map((order) => {
        return (
          <Card key={order._id}>
            <Card.Header>OrderID: {order._id}</Card.Header>
            <h2>Products ordered: {order.products.length}</h2>
            <Container fluid>
              <Row>
                {order.products.map((product) => {
                  return (
                    <Col>
                    <div key={product._id}>
                    <Image
                        src={product.imageURL}
                        style={{ width: "100px" }}/>
                      <h3>{product.name}</h3>
                      <p>Price: {currencyFormatter.format(product.price)}</p>
                    </div>
                      
                    </Col>
                  );
                })}
              </Row>
                <h2>Total: {currencyFormatter.format(orderTotals[order._id])}</h2>
            </Container>
          </Card>
        );
      })}
      <h2>Total Revenue: {currencyFormatter.format(revenue)}</h2>
    </div>
  );
}

export default DashboardPage;
