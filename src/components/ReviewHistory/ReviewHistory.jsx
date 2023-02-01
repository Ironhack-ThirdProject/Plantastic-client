import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import IsCreator from "../IsCreator/IsCreator";

function ReviewHistory({ eachReview, callbackToGetReviews }) {
  const [rating, setRating] = useState(eachReview.rating);
  const [text, setText] = useState(eachReview.text);
  const [showResult, setShowResult] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(true);

  const reviewId = eachReview._id;

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      rating,
      text,
    };
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

    const handleDelete = () => {

      const storedToken = localStorage.getItem("authToken");
      axios
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/reviews/${reviewId}`,
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
    };

  return (
    <>
      {showResult && (
        <>
          <div key={eachReview._id}>
            <p>Rating: {eachReview.rating}</p>
            <p>Text: {eachReview.text}</p>
          </div>
          <IsCreator review={eachReview}>
          <button onClick={handleEdit}>Edit</button>
          </IsCreator>
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
          <IsCreator review={eachReview}>
          <Button onClick={() => {handleDelete()}} variant="danger">
            Delete
          </Button>
          </IsCreator>
        </>
      )}
    </>
  );
}

export default ReviewHistory;
