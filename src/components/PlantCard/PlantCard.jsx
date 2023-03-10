import "./PlantCard.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { currencyFormatter } from "../../utils";
import IsCustomer from "../IsCustomer/IsCustomer";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { CartCountContext } from "../../context/cart.context";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import { AuthContext } from "../../context/auth.context";

export function PlantCard(props) {
  const productId = props._id;
  const [stock, setStock] = useState(props.stock);
  const storedToken = localStorage.getItem("authToken");
  const [quantity, setQuantity] = useState(1);
  const [itemsInCard, setItemsInCart] = useState(0);
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleNewCartCount = (quantity) => {
    //setCartCount(NaN || 0);
    setCartCount(cartCount + parseInt(quantity));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/cart`,
        { productId, quantity: parseInt(quantity) },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("response from the API: ", response.data);
        setItemsInCart(quantity);
        setQuantity(1);
        setStock(response.data.productObject.stock);
        handleNewCartCount(quantity);
      })
      .then((response) => {
        setQuantity(1);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBCol className="my-4 d-flex justify-content-center align-items-center">
      <MDBCard className="p-3" style={{ width: "18rem" }}>
        <MDBRipple
          className="bg-image hover-overlay rounded"
          rippleTag="div"
          rippleColor="light"
        >
          <MDBCardImage src={props.imageURL} className="w-100" />
          <Link to={`/plants/${props._id}`}>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            ></div>
          </Link>
        </MDBRipple>
        <MDBCardBody className="d-flex flex-column">
          <MDBRow>
            <MDBCol className="d-flex justify-content-start">
            <p className="small">{props.category}</p>
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex flex-row mb-4">
            <MDBCol className="d-flex justify-content-start" style={{width: '70%;'}}>
              <Link id="plant-name" to={`/plants/${props._id}`}>
                <h5 className="my-0 plant-name">{props.name}</h5>
              </Link>
              </MDBCol>
              <MDBCol className="d-flex justify-content-end p-0" style={{width: '30%;'}}>
            <h5 className="text-dark mb-0">
              {currencyFormatter.format(props.price)}
            </h5>
            </MDBCol>
            </MDBRow>

          {stock ? (
            <>
            <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-start">
                <p class="text-muted mb-0">
                  Available: <span class="fw-bold">{stock}</span>
                </p>
                </MDBCol>
                </MDBRow>
              <>
                <IsCustomer>
                  {isLoggedIn ? (
                    <>
                      <form onSubmit={handleAddToCart}>
                        <MDBInputGroup>
                          <input
                            className="form-control"
                            label="Quantity"
                            type="number"
                            id="quantity"
                            min={1}
                            max={props.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />

                          <MDBBtn className="m-0 addtocart-button" color="dark" type="submit">
                            Add to cart
                          </MDBBtn>
                        </MDBInputGroup>
                      </form>
                    </>
                  ) : (
                    <>
                      <MDBInputGroup>
                        <input
                          className="form-control"
                          label="Quantity"
                          type="number"
                          id="quantity"
                          min={1}
                          max={props.stock}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />

                        <MDBBtn className="m-0 addtocart-button" color="dark" type="submit">
                          <Link className="link-color" to="/login">
                            Add to cart
                          </Link>
                        </MDBBtn>
                      </MDBInputGroup>
                    </>
                  )}
                </IsCustomer>
              </>
            </>
          ) : (
            <div class="d-flex justify-content-between">
              <p class="text-danger mb-0">
                <span class="fw-bold">Out of stock.</span>
              </p>
            </div>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
