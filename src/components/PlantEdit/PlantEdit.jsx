import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function PlantEdit({ plantData, getPlantDetails }) {
  console.log(plantData);
  const [name, setName] = useState(plantData.name);
  const [description, setDescription] = useState(plantData.description);
  const [caringTips, setCaringTips] = useState(plantData.caringTips);
  const [newTip, setNewTip] = useState("");
  const [imageURL, setImageURL] = useState(plantData.imageURL);
  const [price, setPrice] = useState(plantData.price);
  const [stock, setStock] = useState(plantData.stock);
  const [category, setCategory] = useState(plantData.category);
  const [tag, setTag] = useState(plantData.tag);

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
        `${process.env.REACT_APP_SERVER_URL}/plants/${plantData._id}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        getPlantDetails();
      })
      .catch((error) => console.log(error));
  };

  const handleAddCaringTip = () => {
    setCaringTips((prevCaringTips) => {
      return [...prevCaringTips, newTip];
    });

    setNewTip("");
  };

  const handleRemoveTip = (index) => {
    setCaringTips((prevCaringTips) => {
      const newList = [...prevCaringTips]; //shallow copy
      newList.splice(index, 1);

      return newList;
    });
  };

  const uploadImage = async (file) => {
    return await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, file)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageURL", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        console.log("response is === ", response);
        setImageURL(response.imageURL);
      })
      .catch((error) => {
        console.log("Error while uploading the file: ", error);
      });
  };

  return (
    <div className="AddProduct">
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

          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => {
              handleFileUpload(e);
            }}
          />

          <label>Caring Tips:</label>
          <input
            type="text"
            name="newTip"
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            placeholder="Enter plant caring tip"
          />
          <button type="button" onClick={handleAddCaringTip}>
            Add Input Field
          </button>

          <ul>
            {caringTips.map((tip, index) => (
              <li key={index}>
                {tip}
                <button type="button" onClick={() => handleRemoveTip(index)}>
                  X
                </button>
              </li>
            ))}
          </ul>

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
    </div>
  );
}

export default PlantEdit;
