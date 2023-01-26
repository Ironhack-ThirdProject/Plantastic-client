import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { currencyFormatter } from "../../utils";
import PlantEdit from "../PlantEdit/PlantEdit";

function PlantDetails() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [caringTips, setCaringTips] = useState([]);
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
        console.log("THIS IS THE PLANT ====", response.data)
        setPlant(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setCaringTips(response.data.caringTips);
        setImageURL(response.data.imageURL);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setCategory(response.data.category);
        setTag(response.data.tag);
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
        setPlant(response.data)
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
            <p>
              <b>Currently in stock: {plant.stock}</b>
            </p>
            <p>#{plant.category}</p>
            <p>#{plant.tag}</p>

            <form onSubmit={handleOrder}>
              <button type="submit">Buy Now</button>
            </form>

            {showForm && (
              <div>
                <h3>Edit product</h3>

                <form onSubmit={handleSubmit}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label>Description:</label>
                  <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <label>Caring Tips:</label>
                  <textarea
                    type="text"
                    name="caringTips"
                    value={caringTips}
                    onChange={(e) => setCaringTips(e.target.value)}
                  />

                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <label>Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />

                  <label>Category:</label>
                  <select
                    name="category"
                    aria-label="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Indoor Plants" selected>
                      Indoor Plants
                    </option>
                    <option value="Outdoor Plants">Outdoor Plants</option>
                    <option value="Pet-Friendly">Pet-Friendly</option>
                    <option value="Tropical">Tropical</option>
                  </select>

                  <label>Tag:</label>
                  <select
                    name="tag"
                    aria-label="tag"
                    onChange={(e) => setTag(e.target.value)}
                  >
                    <option value="Beginner-Friendly" selected>
                      Beginner-Friendly
                    </option>
                    <option value="Green Thumb">Green Thumb</option>
                    <option value="Gardening Guru">Gardening Guru</option>
                  </select>

                  <button type="submit">Submit</button>
                </form>
              </div>
            )}

            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Hide Form" : "Edit"}
            </Button>

            <form onSubmit={handleDelete}>
              <Button type="submit" variant="danger">
                Delete
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;
