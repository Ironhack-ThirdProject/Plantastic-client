import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import UpdateQuantity from "../../components/UpdateQuantity/UpdateQuantity";
import { currencyFormatter } from "../../utils";
import { useContext } from "react";
import { CartCountContext } from "../../context/cart.context";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [productId, setProductId] = useState("");
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const [totalQuantity, setTotalQuantity] = useState(cartCount);

  const storedToken = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };

  useEffect(() => {
    handleNewCartCount();
  }, [totalQuantity])

  const handleNewCartCount = () => {
    setCartCount(totalQuantity);
  };


  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/cart?id=${productId}`,
        config
      )
      .then((response) => {
        const sumToBeRemoved = response.data.quantity;
        setTotalQuantity(prevCount => prevCount -= sumToBeRemoved);
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

  useEffect(() => {
    getCartDetails();
  }, []);

  if (!cart || cart.products.length === 0) {
    return <h4>No products found.</h4>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Quantity</th>
            <th className="text-success">UPDATE QUANTITY</th>
            <th>Total</th>
            <th>More Details</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((product, index) => (
            <tr key={index}>
              {/* <td><Image style={{ width: "50px;", height: "50px;"}} src={product.productId.imageURL}/></td> */}
              <td>Image</td>
              <td>{product.productId.name}</td>
              <td>{currencyFormatter.format(product.productId.price)}</td>
              {product.productId.stock ? (<td>{product.productId.stock}</td>) : (<td><h5>Out of stock.</h5></td>)}
              
              <td>{product.quantity}</td>
              
              <td>
                <UpdateQuantity
                  productId={product.productId}
                  quantity={product.quantity}
                  onUpdateQuantity={onUpdateQuantity}
                  handleNewCartCount={handleNewCartCount}
                />
              </td>
              <td>
                {currencyFormatter.format(
                  product.productId.price * product.quantity
                )}
              </td>
              <td>
                <Link to={`/plants/${product.productId._id}`}>
                  <Button variant="secondary">More Details</Button>
                </Link>
              </td>
              <td>
                <form onSubmit={handleDelete}>
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={() => setProductId(product.productId._id)}
                  >
                    Remove
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>
          Total Price: <b>{currencyFormatter.format(cart.totalPrice)}</b>
        </p>
      </div>

      <div>
        <Link to={"/checkout"}>
          <Button variant="primary">Checkout</Button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
