import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import ReviewHistory from "../../components/ReviewHistory/ReviewHistory";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

function ProfilePage() {
  const [orders, setOrders] = useState();
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const getReviews = () => {
    if (user) {
      //fetch reviews
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/reviews/user/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  const getOrders = () => {
    if (user) {
      //fetch orders
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/order/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getReviews();
  }, [user]);

  useEffect(() => {
    getOrders();
  }, [user]);

  return (
    <>
      {orders ? (
        <div>
          {orders.map((orderData) => (
            <OrderHistory eachOrder={orderData}></OrderHistory>
          ))}
        </div>
      ) : (
        <div>You have not ordered anything yet</div>
      )}
      {reviews ? (
        <div>
          {reviews.map((reviewData) => (
            <ReviewHistory
              eachReview={reviewData}
              callbackToGetReviews={getReviews}
            ></ReviewHistory>
          ))}
        </div>
      ) : (
        <div>You have not reviewed anything yet</div>
      )}
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow></MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                <MDBCardTitle>Welcome back, {user.name} 💚</MDBCardTitle>
                  <p className="text-muted mb-4">{user.email}</p>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                <MDBCardTitle>These are your reviews ⭐️</MDBCardTitle>
                  {reviews ? (
                    <div>
                      {reviews.map((reviewData) => (
                        <ReviewHistory
                          eachReview={reviewData}
                          callbackToGetReviews={getReviews}
                        ></ReviewHistory>
                      ))}
                    </div>
                  ) : (
                    <div>You have not reviewed anything yet 😔</div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                <MDBCardTitle>These are your past orders 🪴</MDBCardTitle>
                  {orders ? (
                    <div>
                      {orders.map((orderData) => (
                        <OrderHistory eachOrder={orderData}></OrderHistory>
                      ))}
                    </div>
                  ) : (
                    <div>You have not ordered anything yet 😔</div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default ProfilePage;
