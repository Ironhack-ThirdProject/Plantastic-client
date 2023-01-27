import { useState } from "react";
import axios from "axios";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newTip, setNewTip] = useState("");
  const [caringTips, setCaringTips] = useState([]);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("Indoor Plants");
  const [tag, setTag] = useState("Beginner-Friendly");


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      description,
      image,
      caringTips,
      price,
      stock,
      category,
      tag,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/plants`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setName("");
        setDescription("");
        setCaringTips([]);
        // setImage("");
        setPrice(0);
        setStock(0);
        setCategory("Indoor Plants");
        setTag("Beginner-Friendly");
        //navigate("/plants");

        props.refreshProjects();
      })
      .catch((error) => console.log(error));
  };
  
  const handleAddCaringTip = () => {
    setCaringTips( (prevCaringTips) => {
      return [...prevCaringTips, newTip]
    });

    setNewTip("");
  };

  const handleRemoveTip = (index) => {
    setCaringTips( prevCaringTips => {
      const newList = [...prevCaringTips]; //shallow copy
      newList.splice(index, 1);

      return newList;
    });
  };

  return (
    <div className="AddProduct">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
          <option value="Indoor Plants">Indoor Plants</option>
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
          <option value="Beginner-Friendly">Beginner-Friendly</option>
          <option value="Green Thumb">Green Thumb</option>
          <option value="Gardening Guru">Gardening Guru</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {/* <UploadWidget/> */}
    </div>
  );
}

export default AddProduct;
