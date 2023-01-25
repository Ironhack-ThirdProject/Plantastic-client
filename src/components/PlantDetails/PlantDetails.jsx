import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useParams, useHistory } from "react-router-dom";
import { currencyFormatter } from "../../utils";


function PlantDetails() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);

  const getPlantDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants/${plantId}`)
      .then((response) => {
        setPlant(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlantDetails();
  }, [plantId]);

  // const history = useHistory()

  return (
    <div>
      {plant && (
        <div>
          {/* <Button onClick={() => history.goBack}>Go back</Button>  */}
            <img src={plant.imageURL}/>
          <h1>{plant.name}</h1>
          <p>{plant.description}</p>
          <ul>
            {plant.caringTips.map((tip) => {
              return <li>{tip}</li>;
            })}
          </ul>
          <p>{currencyFormatter.format(plant.price)}</p>
          <p>#{plant.category}</p>
          <p>#{plant.tag}</p>
          <Button>Add to Cart</Button>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;
