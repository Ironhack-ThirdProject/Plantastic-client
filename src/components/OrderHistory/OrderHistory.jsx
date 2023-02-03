import "./OrderHistory.css";
import { currencyFormatter } from "../../utils";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

function OrderHistory({ eachOrder }) {
  console.log(eachOrder);
  const [showProductsInOrder, setShowProductsInOrder] = useState(false);
  const handleAllProductsInOrderClick = () => {
    setShowProductsInOrder(!showProductsInOrder);
  };
  return (
    <>
      <MDBCard>
        <MDBCardBody>
          <div className="d-flex justify-content-between">
            <p className="small">
              <a href="#!" className="text-muted">
                Order #{eachOrder._id}
              </a>
            </p>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">
              {new Date(eachOrder.createdAt).toLocaleDateString()}
            </h5>
            <h5 className="text-dark mb-0">
              Total Price: {currencyFormatter.format(eachOrder.totalPrice)}
            </h5>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <p className="text-muted mb-0">
              Total Products ordered:{" "}
              <span className="fw-bold">{eachOrder.products.length}</span>
            </p>
            <div className="ms-auto text-warning">
              <Button
                className="orderHistory-button"
                onClick={handleAllProductsInOrderClick}
              >
                {showProductsInOrder ? "Hide" : "Show All Purchased Plants"}
              </Button>
              {showProductsInOrder && (
                <div className="text-color" key={eachOrder._id}>
                  {eachOrder.products.map((oneProduct) => (
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle>{oneProduct.productId.name}</MDBCardTitle>
                        <MDBCardSubTitle>
                          Quantity: {oneProduct.quantity}
                        </MDBCardSubTitle>
                        <MDBCardText>
                          Price:{" "}
                          {currencyFormatter.format(oneProduct.productId.price)}{" "}
                        </MDBCardText>
                        {/*
                        <div
                          key={oneProduct.productId._id}
                          className="d-flex justify-content-between mb-3"
                        >
                          <h5>
                            {oneProduct.productId.name + " - "}
                          </h5>
                          <p className="text-muted mb-0">
                          {" "}Quantity:{" "}
                            <span className="fw-bold">{oneProduct.quantity}</span>
                          </p>
                          <h5 className="text-dark mb-0">
                            Price:{" "}
                            {currencyFormatter.format(
                              oneProduct.productId.price
                            )}{" "}
                          </h5>
                         
                        </div>*/}
                      </MDBCardBody>
                    </MDBCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

export default OrderHistory;
