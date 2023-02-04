import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "../../components/AddProduct/AddProduct";
import { Carousel } from "react-bootstrap";
import IsAdmin from "../../components/IsAdmin/isAdmin";
import {
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { PlantCard } from "../../components/PlantCard/PlantCard";
import plantsImage from "../../images/plants-on-cupboard.jpeg";
import plantsImage2 from "../../images/plants-in-a-pot_720.jpg";

export function HomePage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const getAllPlants = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (searchQuery === "") {
          setPlants(response.data);
        } else {
          const plantsToDisplay = response.data.filter((singlePlant) => {
            return singlePlant.category === searchQuery;
          });
          setPlants(plantsToDisplay);
        }
      })
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getAllPlants();
  }, [searchQuery]);

  if (!plants) {
    return <></>;
  }

  return (
    <>
     
      <Carousel>
        <Carousel.Item>
          <div className="carousel-img">
            <img
              className="d-block w-100 carousel-img"
              src="https://img.freepik.com/free-photo/composition-pots-with-plants-wooden-background_23-2148509859.jpg?w=1380&t=st=1675389739~exp=1675390339~hmac=672238efed8f4d873edee88882e80d94112899707bb663e9bf06c97046ec2b73"
              alt=""
            />
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            ></div>
          </div>
          <Carousel.Caption>
            <h3>New Arrivals</h3>
            <p>
              Add a touch of the desert to your home with our stunning cacti
              collection.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-img">
            <img className="d-block w-100" src={plantsImage2} />
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            ></div>
          </div>
          <Carousel.Caption>
            <h3>Nature's Beauty in Your Home</h3>
            <p>
              Bring the outdoors in and transform your space with our selection
              of lush plants.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-img">
            <img
              className="d-block w-100 carousel-img"
              src={plantsImage}
              alt=""
            />
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            ></div>
          </div>
          <Carousel.Caption>
            <h3>Green Your Home with Our Plant Collection</h3>
            <p>
              Nature at your fingertips: Shop now for the perfect plant to match
              your style.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="p-4">
        <IsAdmin>
          <AddProduct refreshProjects={getAllPlants} />
        </IsAdmin>

        <MDBContainer className="my-5">
          <div className="form-container">
            <form className="searchForm">
              <label className="searchLabel">
                Search by Category:
                <select
                  name="category"
                  aria-label="category"
                  className="selectSearch w-100"
                  onChange={(e) => setSearchQuery(e.target.value)}
                >
                  <option value="">All Plants</option>
                  <option value="Indoor Plants">Indoor Plants</option>
                  <option value="Outdoor Plants">Outdoor Plants</option>
                  <option value="Pet-Friendly">Pet-Friendly</option>
                  <option value="Tropical">Tropical</option>
                </select>
              </label>
            </form>
          </div>
        </MDBContainer>

        <MDBContainer fluid className="my-5">
          <MDBRow md="10" lg="2" className="mb-4 mb-lg-0 row d-flex justify-content-center">
            {plants.map((plant) => (
              <PlantCard key={plant._id} {...plant} />
            ))}
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}
