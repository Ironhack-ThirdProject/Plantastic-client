import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormatter } from "../../utils";
import PlantEdit from "../PlantEdit/PlantEdit";
import IsAdmin from "../IsAdmin/isAdmin";
import IsCustomer from "../IsCustomer/IsCustomer";
import AddReview from "../AddReview/AddReview";
import ReviewHistory from "../ReviewHistory/ReviewHistory";

function PlantDetails() {
  const { productId } = useParams();
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [caringTips, setCaringTips] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const getPlantDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants/${productId}`)
      .then((response) => {
        setPlant(response.data);
        setStock(response.data.stock);
      })
      .catch((error) => console.log(error));
  };

  const storedToken = localStorage.getItem("authToken");

  const getReviews = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/reviews/product/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("--- This is the response from /reviews/userId");
        console.log(response.data);
        setReviews(response.data);
        console.log(reviews);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/plants/${productId}`,
        { productId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("Plant deleted!");
        navigate("/plants");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      description,
      caringTips,
      imageURL,
      price,
      stock,
      category,
      tag,
    };

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/plants/${productId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setPlant(response.data);
        getReviews();
      })
      .catch((error) => console.log(error));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/cart`,
        { productId, quantity: parseInt(quantity) },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("response from the API: ", response.data);
        setQuantity(1);
        setStock(response.data.productObject.stock);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPlantDetails();
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {plant && (
        <div>
          <div>
            <Button variant="warning" onClick={() => navigate("/plants")}>
              Go back
            </Button>
          </div>
          <div key={plant._id}>
            <img src={plant.imageURL} alt="product" />
            <h1>{plant.name}</h1>
            <p>{plant.description}</p>

            <ul>
              {plant.caringTips.map((tip) => {
                return <li>{tip}</li>;
              })}
            </ul>
            <p>#{plant.category}</p>
            <p>#{plant.tag}</p>

            <p>Price: {currencyFormatter.format(plant.price)}</p>

            {stock ? (
              <>
                <p>
                  <b>Currently in stock: {stock}</b>
                </p>
                <IsCustomer>
                  <form onSubmit={handleAddToCart}>
                    <label>Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      min={1}
                      max={plant.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />

                    <Button variant="success" type="submit">
                      Add to cart
                    </Button>
                  </form>
                </IsCustomer>
              </>
            ) : (
              <div>
                <h4 class="text-danger">Out of stock.</h4>
              </div>
            )}

            <IsAdmin>
              {showForm && (
                <PlantEdit
                  plantData={plant}
                  getPlantDetails={getPlantDetails}
                />
              )}

              <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Edit"}
              </Button>

              <form onSubmit={handleDelete}>
                <Button type="submit" variant="danger">
                  Delete
                </Button>
              </form>
            </IsAdmin>
            <IsCustomer>
              <AddReview props={productId} />
            </IsCustomer>
          </div>
          {reviews ? (
            <div>
              {reviews.map((eachReview) => (
                <ReviewHistory
                  eachReview={eachReview}
                  callbackToGetReviews={getReviews}
                ></ReviewHistory>
              ))}
            </div>
          ) : (
            <div>This plant does not have any reviews yet</div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlantDetails;
