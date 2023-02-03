import { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newTip, setNewTip] = useState("");
  const [caringTips, setCaringTips] = useState([]);
  const [imageURL, setImageURL] = useState(
    "https://cdn-icons-png.flaticon.com/512/628/628283.png"
  );
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("Indoor Plants");
  const [tag, setTag] = useState("Beginner-Friendly");

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
        setCaringTips([]);
        // setImage("");
        setPrice(0);
        setStock(0);
        setCategory("Indoor Plants");
        setTag("Beginner-Friendly");

        props.refreshProjects();
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
        console.log("This is the image url");
        console.log("response is === ", response.imageURL);
        setImageURL(response.imageURL);
      })
      .catch((error) => {
        console.log("Error while uploading the file: ", error);
      });
  };

  return (
    <section className="bg-light">
    <MDBContainer className="p-4">
      <h3>Add a Plant</h3>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <MDBInput
          wrapperClass="mb-4"
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <MDBTextArea
          wrapperClass="mb-4"
          rows={4}
          label="Description"
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

<MDBInputGroup className='mb-4'>
            <input
            className='form-control'
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
              <p>{tip}</p>
              <MDBBtn type="button" color="danger" onClick={() => handleRemoveTip(index)}>
                X
              </MDBBtn>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>

        
        <MDBInput
        label="Price"
        wrapperClass="mb-4"
        min={1}
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <MDBInput
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
          <option value="Indoor Plants">Indoor Plants</option>
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
          <option value="Beginner-Friendly">Beginner-Friendly</option>
          <option value="Green Thumb">Green Thumb</option>
          <option value="Gardening Guru">Gardening Guru</option>
        </select>
        </MDBCol>
        </MDBRow>
        <MDBBtn color="info" type="submit">Submit</MDBBtn>
      </form>

    </MDBContainer>
    </section>
  );
}

export default AddProduct;
