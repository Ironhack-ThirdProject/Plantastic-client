import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "../../components/AddProduct/AddProduct";
import { Col, Container, Row } from "react-bootstrap";
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
      <MDBCarousel showControls showIndicators>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://mdbootstrap.com/img/new/slides/041.jpg'
        alt='...'
      >
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://mdbootstrap.com/img/new/slides/042.jpg'
        alt='...'
      >
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://mdbootstrap.com/img/new/slides/043.jpg'
        alt='...'
      >
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </MDBCarouselItem>
    </MDBCarousel>

      <div className="p-4">
        <IsAdmin>
          <AddProduct refreshProjects={getAllPlants} />
        </IsAdmin>

        <MDBContainer className="my-5">
          <form>
            <label>
              Search by Category:
              <select
                name="category"
                aria-label="category"
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
