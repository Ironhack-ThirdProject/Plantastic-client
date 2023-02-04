import "./OrderHistory.css";
import { currencyFormatter } from "../../utils";
import { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBBtn,
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
              <MDBBtn
                className="reviewHistory-button"
                color="dark"
                onClick={handleAllProductsInOrderClick}
              >
                {showProductsInOrder ? "Hide" : "Show All Purchased Plants"}
              </MDBBtn>
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
