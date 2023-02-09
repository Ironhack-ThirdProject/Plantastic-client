import "./PlantDetails.css";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormatter } from "../../utils";
import PlantEdit from "../PlantEdit/PlantEdit";
import IsAdmin from "../IsAdmin/isAdmin";
import IsCustomer from "../IsCustomer/IsCustomer";
import AddReview from "../AddReview/AddReview";
import ReviewHistory from "../ReviewHistory/ReviewHistory";
import IsPrivate from "../IsPrivate/IsPrivate";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBBadge,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { AiFillStar } from "react-icons/ai";
import { AuthContext } from "../../context/auth.context";

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
  const { isLoggedIn } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  const roundedAverage = Math.round(averageRating);

  const stars = [];
  for (let i = 0; i < roundedAverage; i++) {
    stars.push(<MDBIcon className="icon-gradient" fas icon="star" />);
  }

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
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/plants/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Plant deleted!");
        navigate("/");
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

  if (!plant) {
    return (
      <section className="gradient-custom no-items">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4 cards">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Oops, this plant doesn't exist.
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody></MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }

  return (
    <div>
      <section className="h-100 marble-background">
        <MDBContainer className="py-5 h-100">
          <MDBRow>
            <MDBCard className="mb-4 cards">
              <MDBCardBody>
                <MDBRow className="justify-content-left my-4">
                  <MDBCol sm="6">
                    <MDBCardImage
                      src={plant.imageURL}
                      className="img-fluid"
                      alt="product"
                    />
                  </MDBCol>
                  <MDBCol>
                    <h3 className="mt-4">
                      <strong>{plant.name}</strong>
                    </h3>
                    <p>{plant.description}</p>
                    {stars ? <p>{stars}</p> : <p>No reviews yet.</p>}
                    <hr />
                    <MDBTypography note noteColor="light">
                      {plant.caringTips.map((tip) => {
                        return <p>{tip}</p>;
                      })}
                    </MDBTypography>
                    <MDBBadge color="warning" light>
                      #{plant.category}
                    </MDBBadge>
                    <MDBBadge className="mx-2" color="info" light>
                      #{plant.tag}
                    </MDBBadge>

                    {stock ? (
                      <>
                        <p className="mt-4">Currently in stock: {stock}</p>
                        <p>Price: {currencyFormatter.format(plant.price)}</p>
                        <IsCustomer>
                          <form onSubmit={handleAddToCart}>
                            {isLoggedIn ? (
                              <MDBInputGroup>
                                <MDBInput
                                  type="number"
                                  id="quantity"
                                  min={1}
                                  max={plant.stock}
                                  value={quantity}
                                  label="Quantity"
                                  onChange={(e) => setQuantity(e.target.value)}
                                />

                                <MDBBtn
                                  color="dark"
                                  className="m-0 addtocart-button"
                                  type="submit"
                                >
                                  Add to cart
                                </MDBBtn>
                              </MDBInputGroup>
                            ) : (
                              <MDBInputGroup>
                                <MDBInput
                                  type="number"
                                  id="quantity"
                                  min={1}
                                  max={plant.stock}
                                  value={quantity}
                                  label="Quantity"
                                  onChange={(e) => setQuantity(e.target.value)}
                                />

                                <MDBBtn color="dark" className="m-0 addtocart-button">
                                  <Link className="link-color" to="/login">
                                    Add to cart
                                  </Link>
                                </MDBBtn>
                              </MDBInputGroup>
                            )}
                          </form>
                        </IsCustomer>
                      </>
                    ) : (
                      <div>
                        <p className="mt-4 text-danger">Out of stock.</p>
                      </div>
                    )}

                    <IsAdmin>
                      {showForm && (
                        <PlantEdit
                          plantData={plant}
                          getPlantDetails={getPlantDetails}
                        />
                      )}

                      <Button
                        className="mb-4"
                        onClick={() => setShowForm(!showForm)}
                      >
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
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          <MDBRow>
            <MDBCard className="mb-4 cards">
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
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default PlantDetails;
