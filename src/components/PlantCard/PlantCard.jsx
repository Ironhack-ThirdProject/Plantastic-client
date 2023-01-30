import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { currencyFormatter } from "../../utils";
import IsCustomer from "../IsCustomer/IsCustomer";
import axios from "axios";

// We are deconstructing props object directly in the parentheses of the function
export function PlantCard(props) {
  const plantId = props._id
  const storedToken = localStorage.getItem("authToken");
  const quantity = 1;
  
  const handleOrder = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/order`,
        { plantId, quantity },
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


  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageURL} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Price: {currencyFormatter.format(props.price)}
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/plants/${props._id}`}>
            <Button variant="secondary">More Details</Button>
          </Link>
          <IsCustomer>
            <form onSubmit={handleOrder}>
              <button type="submit">Buy Now</button>
            </form>
          </IsCustomer>
        </Card.Body>
      </Card>
    </div>
  );
}
