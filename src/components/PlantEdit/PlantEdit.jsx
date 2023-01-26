import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function PlantEdit({ props }) {
  console.log(props);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [caringTips, setCaringTips] = useState(props.caringTips);
  const [imageURL, setImageURL] = useState(props.imageURL);
  const [price, setPrice] = useState(props.price);
  const [stock, setStock] = useState(props.stock);
  const [category, setCategory] = useState(props.category);
  const [tag, setTag] = useState(props.tag);

  const navigate = useNavigate();
  const { plantsId } = useParams();

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

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/plants/${props._id}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProduct">
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
  );
}

export default PlantEdit;
