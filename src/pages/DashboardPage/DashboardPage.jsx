import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { currencyFormatter } from "../../utils";

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [orderTotals, setOrderTotals] = useState([]);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [averageProductsOrdered, setAverageProductsOrdered] = useState(0);

  const storedToken = localStorage.getItem("authToken");

  const getOrderTotals = () => {
    let totalRevenue = 0;
    let totalProducts = 0;
    const totalsOfAllOrders = {};
    orders.forEach((order) => {
      let orderTotal = 0;
      totalProducts += order.products.length;
      order.products.forEach((product) => {
        orderTotal += product.price;
      });
      totalsOfAllOrders[order._id] = orderTotal;
      totalRevenue += orderTotal;
    });
    setRevenue(totalRevenue);
    setOrderTotals(totalsOfAllOrders);
    setAverageOrderValue(totalRevenue / orders.length);
    setAverageProductsOrdered(totalProducts / orders.length);
  };

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

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getProductData = () => {
    
  }

  useEffect(() => {
    getAllOrders();
    getAllProducts();
  }, []);

  useEffect(() => {
    getOrderTotals();
  }, [orders]);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <hr />

      <div>
        <h2 class="p-3 mb-2 bg-info text-white">Sales and revenue data</h2>
        <h2>Current orders: {orders.length}</h2>
        <h2 class="text-danger">Total orders finished: status true</h2>
        <h2 class="text-danger">
          Order details: implement a button to hide / display
        </h2>
        {orders.map((order) => {
          return (
            <Card key={order._id}>
              <Card.Header>OrderID: {order._id}</Card.Header>
              <h2>Products ordered: {order.products.length}</h2>
              <Container fluid>
                <Row>
                  {order.products.map((product) => {
                    return (
                      <Col key={product._id}>
                        <Image
                          src={product.imageURL}
                          style={{ width: "100px" }}
                        />
                        <h3>{product.name}</h3>
                        <p>Price: {currencyFormatter.format(product.price)}</p>
                        <p>Current stock: {product.stock}</p>
                        <p class="text-danger">Quantity:</p>
                      </Col>
                    );
                  })}
                </Row>
                <h4 class="p-3 mb-2 bg-light text-dark">
                  Total: {currencyFormatter.format(orderTotals[order._id])}
                </h4>
              </Container>
            </Card>
          );
        })}
        <h3>
          Average Order Value: {currencyFormatter.format(averageOrderValue)}
        </h3>
        <h3>Average Products Ordered: {averageProductsOrdered}</h3>
        <h2 class="p-3 mb-2 bg-secondary text-white">
          Total Revenue: {currencyFormatter.format(revenue)}
        </h2>
        <hr />
      </div>

      <div>
        <h2 class="p-3 mb-2 bg-success text-white">Inventory and stock data</h2>
        <h2>Total number of products: {products.length}</h2>
        <h2 class="text-danger">Products in each category:</h2>
        <h2 class="text-danger">Low stock: </h2>
        <h2 class="text-danger">Top selling products: </h2>
        <h2 class="text-danger">Best performing categories: </h2>
        <h2 class="text-danger">Product reviews: </h2>
      </div>
    </div>
  );
}

export default DashboardPage;
