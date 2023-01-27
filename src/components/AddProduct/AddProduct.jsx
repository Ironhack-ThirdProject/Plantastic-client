import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [caringTips, setCaringTips] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("Indoor Plants");
  const [tag, setTag] = useState("Beginner-Friendly");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      description,
      imageURL,
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
        setCaringTips("");
        setImageURL("");
        setPrice(0);
        setStock(0);
        setCategory("Indoor Plants");
        setTag("Beginner-Friendly");
        //navigate("/plants");

        props.refreshProjects();
      })
      .catch((error) => console.log(error));
  };

  const uploadImage = async (file) => {
    return await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, file)
      .then(res => res.data)
      .catch((error) => {
        console.log(error)
      });
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageURL", e.target.files[0])

    uploadImage(uploadData)
    .then(response => {
      console.log("response is === ", response)
      setImageURL(response.imageURL)
    })
    .catch((error) => {
      console.log("Error while uploading the file: ", error)
    })
  
  }




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

        <label>Image:</label>
        <input type="file" onChange={(e) => {handleFileUpload(e)}} />

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
        <select name="category" aria-label="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="Indoor Plants">Indoor Plants</option>
          <option value="Outdoor Plants">Outdoor Plants</option>
          <option value="Pet-Friendly">Pet-Friendly</option>
          <option value="Tropical">Tropical</option>
        </select>

        <label>Tag:</label>
        <select name="tag" aria-label="tag" onChange={(e) => setTag(e.target.value)}>
          <option value="Beginner-Friendly">Beginner-Friendly</option>
          <option value="Green Thumb">Green Thumb</option>
          <option value="Gardening Guru">Gardening Guru</option>
        </select>

        <button type="submit">Submit</button>
      </form>

    </div>
  );
}

export default AddProduct;

