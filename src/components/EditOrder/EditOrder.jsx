import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IsCustomer from "../IsCustomer/IsCustomer";
import ConfettiExplosion from "react-confetti-explosion";

export function EditOrder({ cart, getCartDetails }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [status, setStatus] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${storedToken}` } };

  const navigate = useNavigate();

  const explosion = {
    force: 0.6,
    duration: 5000,
    particleCount: 200,
    height: 1600,
    width: 1600,
    colors: ["#d5e1df", "#e3eaa7", "#b5e7a0", "#86af49"],
  };

  const source = {
    position: "absolute",
    right: "50%",
    left: "50%",
    bottom: 500,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setShowResult(false);
    setIsSubmitted(false);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    const requestBody = {
      firstName
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/send-email`, requestBody, config)
      .then((res) => {
        console.log("Email response: ", res);
      })
      .catch((err) => {
        console.log("Error sending email: ", err);
      });
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    setStatus(true);
    setShowConfetti(true);
    setTimeout(() => {
      navigate("/profile");
    }, 5000);

    const requestBody = {
      firstName,
      lastName,
      shippingAddress,
      billingAddress,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/order`, requestBody, config)
      .then((res) => {
        console.log("this is the cart for the front end: ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!cart || cart.products.length === 0) {
    return <h4>No products found.</h4>;
  }

  return (
    <div>
      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Shipping Address:
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Billing Address:
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}

      {showResult && (
        <>
          <div>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Shipping Address: {shippingAddress}</p>
            <p>Billing Address: {billingAddress}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>

          <form onSubmit={handleSendEmail}>
        <button type="submit">Click me!</button>
      </form>

          <div>
            <h3>Place an order:</h3>
            <p>Order status: {status ? "Confirmed" : "Pending"}</p>
            {!status && (
              <Button onClick={handleConfirmClick}>Confirmation</Button>
            )}

            {showConfetti && (
              <div>
                <p>Thank you for your purchase! 🎉🎉🎉</p>
                <div style={source}>
                  <ConfettiExplosion {...explosion} />
                </div>
                <button onClick={() => setShowConfetti(false)}>Close</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
