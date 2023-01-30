import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { currencyFormatter } from "../../utils";
import axios from "axios";

export function PlantOrderedCard({ props, getOrderDetails }) {
  const plantId = props._id
  const storedToken = localStorage.getItem("authToken");
  const config = {headers: { Authorization: `Bearer ${storedToken}`}}

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/order?id=${plantId}`, config )
      .then((response) => {
        getOrderDetails()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} key={props._id}>
        <Card.Img variant="top" src={props.imageURL} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Id: {props._id}</ListGroup.Item>
            <ListGroup.Item>
              Price: {currencyFormatter.format(props.price)}
            </ListGroup.Item>
            <ListGroup.Item>Quantity: x</ListGroup.Item>
          </ListGroup>

          <Link to={`/plants/${props._id}`}>
            <Button variant="secondary">More Details</Button>
          </Link>
          <form onSubmit={handleDelete}>
            <button type="submit" variant="danger">Remove</button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
