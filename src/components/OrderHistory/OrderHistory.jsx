import { currencyFormatter } from "../../utils";
import { useState } from "react";

function OrderHistory({ eachOrder }) {
  console.log(eachOrder);
  const [showProductsInOrder, setShowProductsInOrder] = useState(false);
  const handleAllProductsInOrderClick = () => {
    setShowProductsInOrder(!showProductsInOrder);
  };
  return (
    <>
    <div key={eachOrder._id}>
      <p>{new Date(eachOrder.createdAt).toLocaleDateString()}</p>
      <p>Total Price: {currencyFormatter.format(eachOrder.totalPrice)}</p>
      <button onClick={handleAllProductsInOrderClick}>
        {showProductsInOrder ? "Hide" : "Show All Purchased Plants"}
      </button>
      {showProductsInOrder && (
        <div key={eachOrder._id}>
          {eachOrder.products.map((oneProduct) => (
            <div key={oneProduct.productId._id}>
              Name: {oneProduct.productId.name} Price:{" "}
              {currencyFormatter.format(oneProduct.productId.price)} X{" "}
              {oneProduct.quantity}
            </div>
          ))}
        </div>
      )}
    </div>
    <MDBCard>
              <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <MDBCardImage
                src={plant.imageURL}
                fluid
                className="w-100"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
            </MDBRipple>
            <MDBCardBody>
              <div className="d-flex justify-content-between">
                <p className="small">
                  <a href="#!" className="text-muted">
                    Laptops
                  </a>
                </p>
                <p className="small text-danger">
                  <s>$1099</s>
                </p>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">HP Notebook</h5>
                <h5 className="text-dark mb-0">$999</h5>
              </div>

              <div class="d-flex justify-content-between mb-2">
                <p class="text-muted mb-0">
                  Available: <span class="fw-bold">6</span>
                </p>
                <div class="ms-auto text-warning">
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                </div>
              </div>
            </MDBCardBody>
              </MDBCard>
              </>
  );
}

export default OrderHistory;
