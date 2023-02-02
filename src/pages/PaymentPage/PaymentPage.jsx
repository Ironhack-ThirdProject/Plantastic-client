import "./PaymentPage.css";
import ConfettiExplosion from "react-confetti-explosion";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentPage() {
  const path = window.location.pathname;
  console.log("this is the path:::", path);

  const navigate = useNavigate();

  const setConfettiExplosion = () => {
    setTimeout(() => {
        navigate("/profile");
      }, 6500);
  }

  useEffect(() => {
    if (path === "/payment/success"){
        setConfettiExplosion()    
    }
  }, [])
  
  const explosion = {
    force: 0.6,
    duration: 5000,
    particleCount: 200,
    height: 1600,
    width: 1600,
    colors: ["#d5e1df", "#e3eaa7", "#b5e7a0", "#86af49"],
  };

  return (
    <div className="styled-div">
      <div className="text-div">
        {path === "/payment/success" ? (
          <>
            <ConfettiExplosion {...explosion} />
            <h1 className="title-success">Thank you for your purchase!</h1>
            <p className="paragraph1">
              We're thrilled to have you as a part of our growing community of
              plant lovers! Your order is on its way and we can't wait for you
              to watch your new plants grow and flourish. Wishing you a
              wonderful day filled with greenery and growth.
            </p>
            <p className="paragraph2">The Plantastic Team. 🌿</p>
            <p className="text-secondary">You will be redirected.</p>
          </>
        ) : (
          <>
            <h1 className="text-danger">Your payment has been canceled.</h1>
            <p className="paragraph1">
              We noticed that your recent payment for your order with us has
              been cancelled. If you need any assistance or have any questions,
              please don't hesitate to reach out to us.
            </p>
            <p className="paragraph2">The Plantastic Team. 🌿</p>
            <Link to={"/cart"}>
              <Button variant="success">Go back</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
