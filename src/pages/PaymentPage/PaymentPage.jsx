import "./PaymentPage.css";
import {Col, Container, Row } from "react-bootstrap";

function PaymentPage() {
  const path = window.location.pathname;
  console.log("this is the path:::", path);
  const imageUrl = "https://img.freepik.com/free-vector/nature-background-design-with-golden-foil_52683-46174.jpg?w=2000"

  return (
      <div className="styled-div">
        <div className="text-div">
            <h1>Thank you for your purchase!</h1>
            <p className="paragraph">We're thrilled to have you as a part of our growing community of plant lovers! <br/>
            Your order is on its way and we can't wait for you to watch your new plants grow and flourish.</p>
        </div>
      </div>
  );
}

export default PaymentPage;
