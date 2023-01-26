import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import { currencyFormatter } from "../../utils";

// We are deconstructing props object directly in the parentheses of the function
export function PlantOrderedCard({ props }) {

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageURL} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: {currencyFormatter.format(props.price)}</ListGroup.Item>
        <ListGroup.Item>Quantity: XXXXX</ListGroup.Item>
      </ListGroup>

      <Link to={`/plants/${props._id}`}><Button variant="secondary">More Details</Button></Link>
      <Button variant="danger">Remove</Button>
      </Card.Body>
      </Card>
    </div>
  );
}
