import { useState } from "react";
import axios from "axios";

function AddReview({ props }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = () => {

    const requestBody = {
      props,
      rating,
      text,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/reviews`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setRating(5);
        setText("");
        //callbackToGetReviews();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddReview">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">
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

        <button type="submit">Submit</button>
        
      </form>
    </div>
  );
}

export default AddReview;
