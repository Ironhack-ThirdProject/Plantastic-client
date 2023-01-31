import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { currencyFormatter } from "../../utils";
import IsCustomer from "../IsCustomer/IsCustomer";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

export function PlantCard(props) {
  const productId = props._id;
  const [stock, setStock] = useState(props.stock);
  const storedToken = localStorage.getItem("authToken");
  const [quantity, setQuantity] = useState(1);

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
        setQuantity(1);
        setStock(response.data.productObject.stock);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageURL} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>

          <Card.Text>Price: {currencyFormatter.format(props.price)}</Card.Text>
          
            {stock ? (
              <>
                <p>
                  <b>Currently in stock: {stock}</b>
                </p>
                <IsCustomer>
                <form onSubmit={handleAddToCart}>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    min={1}
                    max={props.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <Button variant="success" type="submit">
                    Add to cart
                  </Button>
                </form>
                </IsCustomer>
              </>
            ) : (
              <div>
                <h4 class="text-danger">Out of stock.</h4>
              </div>
            )}
          <Link to={`/plants/${props._id}`}>
            <Button variant="secondary">More Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
