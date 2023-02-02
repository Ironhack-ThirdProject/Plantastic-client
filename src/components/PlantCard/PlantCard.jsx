import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { currencyFormatter } from "../../utils";
import IsCustomer from "../IsCustomer/IsCustomer";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
<<<<<<< Updated upstream
import { ShoppingCartContext } from "../../context/cart.context";
=======
import { CartCountContext } from "../../context/cart.context";
>>>>>>> Stashed changes

// We are deconstructing props object directly in the parentheses of the function
export function PlantCard(props) {
  const productId = props._id;
  const [stock, setStock] = useState(props.stock);
  const storedToken = localStorage.getItem("authToken");
  const [quantity, setQuantity] = useState(1);
<<<<<<< Updated upstream
  const [itemsInCard, setItemsInCart] = useState(0);

  const handleOrder = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/order`,
        { productId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("Plant ordered!");
      })
      .catch((error) => {
        console.log(error);
      });
=======
  const { cartCount, setCartCount } = useContext(CartCountContext);

  const handleNewCartCount = (quantity) => {
    console.log("THis is the current cart count");
    console.log(typeof cartCount);
    console.log(cartCount);
    //setCartCount(NaN || 0);
    setCartCount(cartCount + parseInt(quantity));
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        setItemsInCart(quantity);
        setQuantity(1);
        setStock(response.data.productObject.stock);
        // addProduct(response.data.updatedCart)
=======
        setStock(response.data.productObject.stock);
        handleNewCartCount(quantity);
>>>>>>> Stashed changes
      })
      .then((response) => {
        setQuantity(1);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  console.log("This is the cartcount in the plantcard " + cartCount);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageURL} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
<<<<<<< Updated upstream
          <Card.Text>Current in stock: {stock}</Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Price: {currencyFormatter.format(props.price)}
            </ListGroup.Item>
          </ListGroup>
=======

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
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
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
>>>>>>> Stashed changes
          <Link to={`/plants/${props._id}`}>
            <Button variant="secondary">More Details</Button>
          </Link>
          <IsCustomer>
            <form onSubmit={handleOrder}>
              <button type="submit">Buy Now</button>
            </form>

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
              <ShoppingCartContext.Consumer>
                {({ itemCount, setItemCount }) => (
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => setItemCount(quantity)}
                  >
                    Add to cart
                  </Button>
                )}
              </ShoppingCartContext.Consumer>
              {/**
              <Button variant="success" type="submit">
                Add to cart
              </Button>
            */}
            </form>
          </IsCustomer>
        </Card.Body>
      </Card>
    </div>
  );
}
