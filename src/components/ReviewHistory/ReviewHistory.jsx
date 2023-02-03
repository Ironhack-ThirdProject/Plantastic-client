import "./ReviewHistory.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import IsCreator from "../IsCreator/IsCreator";
import IsCustomer from "../IsCustomer/IsCustomer";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";

function ReviewHistory({ eachReview, callbackToGetReviews }) {
  const [rating, setRating] = useState(eachReview.rating);
  const [text, setText] = useState(eachReview.text);
  const [showResult, setShowResult] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(true);

  const stars = [];

  for (let i = 0; i < eachReview.rating; i++) {
    stars.push(
      <>
        {" "}
        <MDBIcon className="icon-gradient" fas icon="star" />{" "}
      </>
    );
  }

  const reviewId = eachReview._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      rating,
      text,
    };
    console.log(requestBody);
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/reviews/${reviewId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        callbackToGetReviews();
      })
      .catch((error) => {
        console.log(error);
      });
    setShowResult(true);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setShowResult(false);
    setIsSubmitted(false);
  };

  const handleDelete = (reviewId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        callbackToGetReviews();
        setShowResult(true);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {showResult && (
        <>
          <MDBCard className="mt-4 mb-6">
            <MDBCardHeader>{stars}</MDBCardHeader>
            <MDBCardBody>
              <MDBTypography blockquote>
                <p>{eachReview.text}</p>
              </MDBTypography>
              <IsCustomer>
                <IsCreator review={eachReview}>
                  <Button className="reviewHistory-button" onClick={handleEdit}>
                    Edit
                  </Button>
                </IsCreator>
              </IsCustomer>
            </MDBCardBody>
          </MDBCard>
        </>
      )}
      {!isSubmitted && (
        <>
          <form onSubmit={handleSubmit}>
            <label>Rating: (1-5)</label>
            <input
              type="number"
              name="rating"
              value={rating}
              min="1"
              max="5"
              onChange={(e) => setRating(e.target.value)}
            />

            <label>Please explain your review here:</label>
            <textarea
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <IsCustomer>
            <IsCreator review={eachReview}>
              <Button
                onClick={() => {
                  handleDelete(eachReview._id);
                }}
                variant="danger"
              >
                Delete
              </Button>
            </IsCreator>
          </IsCustomer>
        </>
      )}
    </>
  );
}

export default ReviewHistory;
