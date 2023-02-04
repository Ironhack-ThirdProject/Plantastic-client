import { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

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
    <div>
      <div className="bg-light p-4">
        <h3>Edit product</h3>
        <form onSubmit={handleSubmit}>
          <MDBInput
            className="w-100"
            label="Name"
            wrapperClass="mb-4"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <MDBTextArea
            className="w-100"
            label="Description"
            wrapperClass="mb-4"
            rows={4}
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <MDBInput
            wrapperClass="mb-4"
            type="file"
            onChange={(e) => {
              handleFileUpload(e);
            }}
          />

          <MDBInputGroup className="mb-4">
            <input
              className="form-control"
              label="Caring Tips"
              type="text"
              name="newTip"
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              placeholder="Caring Tip"
            />
            <MDBBtn type="button" color="success" onClick={handleAddCaringTip}>
              Add Input Field
            </MDBBtn>
          </MDBInputGroup>

          <MDBListGroup className="mb-4">
            {caringTips.map((tip, index) => (
              <MDBListGroupItem key={index}>
                {tip}
                <MDBBtn
                  color="danger"
                  type="button"
                  onClick={() => handleRemoveTip(index)}
                >
                  X
                </MDBBtn>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>

          <MDBInput
            className="w-100"
            label="Price"
            wrapperClass="mb-4"
            min={1}
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <MDBInput
            className="w-100"
            label="Stock"
            wrapperClass="mb-4"
            min={1}
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <MDBRow>
            <MDBCol>
              <label>Category:</label>
              <select
                className="mb-4"
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
            </MDBCol>
            <MDBCol>
              <label>Tag:</label>
              <select
                className="mb-4"
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
            </MDBCol>
          </MDBRow>

          <MDBBtn color="info" type="submit">
            Submit
          </MDBBtn>
        </form>
      </div>
    </div>
  );
}

export default PlantEdit;
