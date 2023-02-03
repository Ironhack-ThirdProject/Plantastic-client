import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "../../components/AddProduct/AddProduct";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import IsAdmin from "../../components/IsAdmin/isAdmin";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCarousel,
  MDBCarouselItem,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { PlantCard } from "../../components/PlantCard/PlantCard";
import plantsImage from "../../images/plants-on-cupboard.jpeg";
import plantsImage2 from "../../images/plants-in-a-pot_720.jpg"

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

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllPlants();
  }, [searchQuery]);

  if (!plants) {
    return <></>;
  }

  return (
    <>
    {/* 'https://img.freepik.com/free-photo/composition-pots-with-plants-wooden-background_23-2148509859.jpg?w=1380&t=st=1675389739~exp=1675390339~hmac=672238efed8f4d873edee88882e80d94112899707bb663e9bf06c97046ec2b73' */}
      <Carousel>
      <Carousel.Item>
        <div className="carousel-img">
        <img className="d-block w-100 carousel-img" src="https://img.freepik.com/free-photo/composition-pots-with-plants-wooden-background_23-2148509859.jpg?w=1380&t=st=1675389739~exp=1675390339~hmac=672238efed8f4d873edee88882e80d94112899707bb663e9bf06c97046ec2b73" alt="" />
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        </div>
        <Carousel.Caption>
        <h3 className="caption-title">New Arrivals</h3>
        <p className="caption-text">Add a touch of the desert to your home with our stunning cacti collection.</p>
        </Carousel.Caption>
        </Carousel.Item>
      <Carousel.Item>
      <div className="carousel-img">
        <img className="d-block w-100" src={plantsImage2}/>
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        </div>
        <Carousel.Caption>
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-img">
        <img className="d-block w-100 carousel-img" src={plantsImage} alt="" />
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        </div>
        <Carousel.Caption>
        <h3 className="caption-title">New Arrivals</h3>
        <p className="caption-text">Nature at your fingertips: Shop now for the perfect plant to match your style.</p>
        </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

      <div className="p-4">
        <IsAdmin>
          <AddProduct refreshProjects={getAllPlants} />
        </IsAdmin>

        <MDBContainer className="my-5">
          <form className="searchForm">
            <label className="searchLabel">
              Search by Category:
              <select
                name="category"
                aria-label="category"
                className="selectSearch"
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
        </MDBContainer>

        <MDBContainer fluid className="my-5">
          <MDBRow md="10" lg="2" className="mb-4 mb-lg-0">
            {plants.map((plant) => (
              <PlantCard key={plant._id} {...plant} />
            ))}
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}
