import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../../utils";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [productId, setProductId] = useState("")

  const storedToken = localStorage.getItem("authToken");
  const config = {headers: { Authorization: `Bearer ${storedToken}`}}

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/cart?id=${productId}`, config )
      .then((response) => {
        console.log("this is the response: ", response)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/cart`, config)
      .then((res) => {
        console.log("this is the response", res.data);
        setCart(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <th>Quantity</th>
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
              <td>{product.quantity}</td>
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
                  <Button type="submit" variant="danger" onClick={() => setProductId(product.productId._id)}>
                    Remove
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Total Price: <b>{currencyFormatter.format(cart.totalPrice)}</b>
      </p>
    </div>
  );
}

export default CartPage;
