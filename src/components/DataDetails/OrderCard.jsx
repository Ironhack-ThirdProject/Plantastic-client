import React from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { currencyFormatter } from "../../utils";

function OrderCard({ orders, orderTotals }) {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  console.log("these are the ORDERS ======> ", orders)

  const handleOrderDetailsClick = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <div>
      <button onClick={handleOrderDetailsClick}>
        {showOrderDetails ? "Hide All Orders" : "Show All Orders"}
      </button>
      {showOrderDetails && (
        <div>
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
                            src={product.productId.imageURL}
                            style={{ width: "100px" }}
                          />
                          <h3>{product.productId.name}</h3>
                          <p>
                            Price per unit:{" "}
                            {currencyFormatter.format(product.productId.price)}
                          </p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Total price: {currencyFormatter.format(product.quantity * product.productId.price)}</p>
                        </Col>
                      );
                    })}
                  </Row>
                  <h4 class="p-3 mb-2 bg-light text-dark">
                    Total: {currencyFormatter.format(order.totalPrice)}
                  </h4>
                </Container>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderCard;
