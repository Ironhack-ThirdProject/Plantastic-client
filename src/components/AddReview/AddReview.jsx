import { useState } from "react";
import axios from "axios";
import { MDBBtn, MDBCheckbox, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { AiFillStar } from 'react-icons/ai'
import IsPrivate from "../IsPrivate/IsPrivate";


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
    <div>
      <hr />
      <h3>Add a review</h3>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label className="mt-2">Rating (1-5 <AiFillStar/>):</label>
        <MDBInput
        className="w-100"
        label="Rating"
          type="number"
          name="rating"
          value={rating}
          min="1"
          max="5"
          onChange={(e) => setRating(e.target.value)}
        />

        <label className="mt-2">Please enter your review here:</label>
        <MDBTextArea 
          className="w-100"
          wrapperClass='mb-4'
          rows={4} 
          label='Message'
          type="text"
          name="text"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />

        <MDBBtn color="warning" type="submit">Submit</MDBBtn>
      </form>
    </div>
  );
}

export default AddReview;
