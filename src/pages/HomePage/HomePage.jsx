import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "../../components/AddProduct/AddProduct";
import { Col, Container, Row } from "react-bootstrap";
import IsAdmin from "../../components/IsAdmin/isAdmin";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRipple, MDBRow } from "mdb-react-ui-kit";

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

  if (!plants){
    return (
      <></>
    )
  }

  return (
    <div>
      <IsAdmin>
        <AddProduct refreshProjects={getAllPlants} />
      </IsAdmin>
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
      <MDBContainer className="my-5">
        <MDBRow md="12" lg="4" className="mb-4 mb-lg-0">
          {plants.map((plant) => (
            <MDBCol key={plant._id}>
              <MDBCard>
              <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <MDBCardImage
                src={plant.imageURL}
                fluid
                className="w-100"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
            </MDBRipple>
            <MDBCardBody>
              <div className="d-flex justify-content-between">
                <p className="small">
                  <a href="#!" className="text-muted">
                    Laptops
                  </a>
                </p>
                <p className="small text-danger">
                  <s>$1099</s>
                </p>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">HP Notebook</h5>
                <h5 className="text-dark mb-0">$999</h5>
              </div>

              <div class="d-flex justify-content-between mb-2">
                <p class="text-muted mb-0">
                  Available: <span class="fw-bold">6</span>
                </p>
                <div class="ms-auto text-warning">
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                </div>
              </div>
            </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
