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
      
    </div>
  );
}

export default PlantEdit;
