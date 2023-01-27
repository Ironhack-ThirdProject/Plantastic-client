import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { currencyFormatter } from "../../utils";
import PlantEdit from "../PlantEdit/PlantEdit";
import IsAdmin from "../IsAdmin/isAdmin";

function PlantDetails() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [caringTips, setCaringTips] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const [showForm, setShowForm] = useState(false);

  const getPlantDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants/${plantId}`)
      .then((response) => {
        console.log("THIS IS THE PLANT ====", response.data);
        setPlant(response.data);
      })
      .catch((error) => console.log(error));
  };

  const storedToken = localStorage.getItem("authToken");

  const handleOrder = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/order`,
        { plantId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("Plant ordered!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/plants/${plantId}`,
        { plantId },
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
        `${process.env.REACT_APP_SERVER_URL}/plants/${plantId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("This is the newPLANT===", response.data);
        setPlant(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlantDetails();
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
            <img src={plant.imageURL} />
            <p>{plant._id}</p>
            <h1>{plant.name}</h1>
            <p>{plant.description}</p>

            <ul>
              {plant.caringTips.map((tip) => {
                return <li>{tip}</li>;
              })}
            </ul>
            
            <p>{currencyFormatter.format(plant.price)}</p>
            <IsAdmin>
            <p>
              <b>Currently in stock: {plant.stock}</b>
            </p>
            </IsAdmin>
            <p>#{plant.category}</p>
            <p>#{plant.tag}</p>

            <form onSubmit={handleOrder}>
              <button type="submit">Buy Now</button>
            </form>
            <IsAdmin>
            {showForm && (
              <PlantEdit plantData={plant} getPlantDetails={getPlantDetails}/>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;
