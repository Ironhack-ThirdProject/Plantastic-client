import "./CartPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import UpdateQuantity from "../../components/UpdateQuantity/UpdateQuantity";
import { currencyFormatter } from "../../utils";
import { useContext } from "react";
import { CartCountContext } from "../../context/cart.context";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [productId, setProductId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const [totalQuantity, setTotalQuantity] = useState(cartCount);

  const storedToken = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };

  const handleNewCartCount = () => {
    setCartCount(totalQuantity);
  };

  useEffect(() => {
    handleNewCartCount();
  }, [totalQuantity]);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/cart?id=${productId}`,
        config
      )
      .then((response) => {
        const sumToBeRemoved = response.data.quantity;
        setTotalQuantity((prevCount) => (prevCount -= sumToBeRemoved));
        getCartDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getCartDetails() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/cart`, config)
      .then((res) => {
        console.log("here is the cart: ", res.data);
        setCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onUpdateQuantity(idOfTheProduct, newQuantity) {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/cart`,
        { productId: idOfTheProduct, quantity: parseInt(newQuantity) },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        let quantityArr = [];
        response.data.updatedCart.products.forEach((product) => {
          console.log(product);
          quantityArr.push(product.quantity);
        });
        let sum = quantityArr.reduce((a, b) => a + b, 0);
        console.log(sum);
        setTotalQuantity(sum);
      })
      .then(() => {
        getCartDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setShowResult(false);
    setIsSubmitted(false);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const requestBody = {
      cart,
      firstName,
      lastName,
      shippingAddress,
      billingAddress,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/checkout`, requestBody, config)
      .then((res) => {
        window.location = res.data.newUrl;
      })
      .catch((err) => {
        console.log("Error sending payment: ", err);
      });
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  if (!cart || cart.products.length === 0) {
    return (
      <section className="gradient-custom no-items">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4 cards">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - 0 items
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody></MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4 cards">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Cart - {cart.products.length}{" "}
                  {cart.products.length === 1 ? <>item</> : <>items</>}
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {cart.products.map((product, index) => (
                  <div key={index}>
                    {product.productId && (
                      <MDBRow>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleTag="div"
                            rippleColor="light"
                            className="bg-image rounded hover-overlay"
                          >
                            <img
                              src={product.productId.imageURL}
                              className="w-100"
                              alt="product"
                            />
                            <Link to={`/plants/${product.productId._id}`}>
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </Link>
                          </MDBRipple>
                        </MDBCol>

                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                          <p>
                            <strong>{product.productId.name}</strong>
                          </p>
                          {product.productId.stock ? (
                            <p>Current stock: {product.productId.stock}</p>
                          ) : (
                            <p className="text-danger">Out of stock.</p>
                          )}
                          <p>Quantity: {product.quantity}</p>

                          <form onSubmit={handleDelete}>
                            <Button
                              type="submit"
                              variant="danger"
                              onClick={() =>
                                setProductId(product.productId._id)
                              }
                            >
                              Remove
                            </Button>
                          </form>
                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <UpdateQuantity
                              productId={product.productId}
                              quantity={product.quantity}
                              onUpdateQuantity={onUpdateQuantity}
                              handleNewCartCount={handleNewCartCount}
                            />
                          </div>

                          <p className="text-start text-md-center">
                            <strong>
                              {currencyFormatter.format(
                                product.productId.price
                              )}
                            </strong>
                          </p>
                        </MDBCol>
                      </MDBRow>
                    )}
                    <hr className="my-4" />
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                {!isSubmitted && (
                  <>
                    <p>
                      <strong>Your Details:</strong>
                    </p>
                    <form onSubmit={handleSubmit}>
                      <MDBRow className="mb-4">
                        <MDBCol>
                          <MDBInput
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            id="form6Example1"
                            label="First name"
                          />
                        </MDBCol>
                        <MDBCol>
                          <MDBInput
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            id="form6Example2"
                            label="Last name"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                        wrapperClass="mb-4"
                        id="form6Example3"
                        label="Shipping Address"
                      />
                      <MDBInput
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        required
                        wrapperClass="mb-4"
                        id="form6Example4"
                        label="Billing Address"
                      />

                      <Button variant="success" type="submit">
                        Submit
                      </Button>
                    </form>
                  </>
                )}

                {showResult && (
                  <>
                    <p>
                      <strong>Your Details:</strong>
                    </p>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {firstName} {lastName}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="text-secondary" />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Shipping Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {shippingAddress}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="text-secondary" />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Billing Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {billingAddress}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="text-light" />
                    <Button variant="success" onClick={handleEdit}>
                      Edit
                    </Button>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody>
                <p>
                  <strong>We accept</strong>
                </p>
                <MDBCardImage
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <MDBCardImage
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{currencyFormatter.format(cart.totalPrice)}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>
                        {currencyFormatter.format(cart.totalPrice)}
                      </strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>

                {isSubmitted && (
                  <form onSubmit={handlePayment}>
                    <MDBBtn className="btn btn-info" block size="lg">
                      Checkout
                    </MDBBtn>
                  </form>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
