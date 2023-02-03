import "./ReviewHistory.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import IsCreator from "../IsCreator/IsCreator";
import IsCustomer from "../IsCustomer/IsCustomer";
import { AiFillStar } from "react-icons/ai";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTypography,
  MDBInput,
  MDBTextArea,
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
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <label className="mt-2">
              Rating (1-5 <AiFillStar />
              ):
            </label>
            <MDBInput
              label="Rating"
              type="number"
              name="rating"
              value={rating}
              min="1"
              max="5"
              onChange={(e) => setRating(e.target.value)}
            />

            <label className="mt-2">Please explain your review here:</label>
            <MDBTextArea
              wrapperClass="mb-4"
              id="textAreaExample"
              rows={4}
              label="Message"
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" className="reviewHistory-button">
              Submit
            </Button>
          </form>
          <IsCustomer>
            <IsCreator review={eachReview}>
              <Button
                className="delete-button"
                onClick={() => {
                  handleDelete(eachReview._id);
                }}
                variant="danger"
              >
                Delete
              </Button>
            </IsCreator>
          </IsCustomer>
          {/*
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
            <Button type="submit" className="reviewHistory-button">Submit</Button>
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
           */}
        </>
      )}
    </>
  );
}

export default ReviewHistory;
